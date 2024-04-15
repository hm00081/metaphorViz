// Libraries
import { linkHorizontal, line, curveCardinal } from 'd3-shape';
// Types
import { SankeyData, SankeyLinkExtended, SankeyNodeExtended } from '../../types';

export const calcSankeyLinks = (
    data: SankeyData,
    height: number,
    nodes: SankeyNodeExtended[],
    nodeWidth: number,
    minLinkBreadth?: number,
    maxLinkBreadth?: number,
    isSort: boolean = true
): SankeyLinkExtended[] => {
    // Extract to const so its in a closure
    const { links } = data;
    const proportionalNodeWidth = nodeWidth * (height / 100);
    const proportionalMaxLinkBreadth = maxLinkBreadth && maxLinkBreadth * (height / 100);
    const proportionalMinLinkBreadth = minLinkBreadth && minLinkBreadth * (height / 100);
    const totalValue = nodes.map((node) => node.value).reduce((acc, cur) => (acc += cur), 0);

    // Extend Links to add additional data
    const extendedLinks = links.map((link) => {
        const sourceNode = nodes.filter((node) => node.index === link.source)[0];
        const targetNode = nodes.filter((node) => node.index === link.target)[0];
        const valueid = link.valueid;
        const color = link.color;
        const subcolor = link.subcolor;
        const overlapid = link.overlapid;
        const breadth = (link.value / totalValue) * height;
        const maxBreadth = proportionalMaxLinkBreadth ? Math.min(breadth, proportionalMaxLinkBreadth) : breadth;
        const minBreadth = proportionalMinLinkBreadth ? Math.max(breadth, proportionalMinLinkBreadth) : breadth;
        const linkBreadth = breadth > maxBreadth ? maxBreadth : minBreadth;
        const extendedLink: SankeyLinkExtended = {
            ...link,
            sourceNode,
            sourceNodeYPosition: 0, // 링크 분리를 위한 값(type) 추가  0으로 해도 상관 없음.
            targetNode,
            valueid,
            targetNodeYPosition: 0, // 링크 분리를 위한 값(type) 추가
            breadth: linkBreadth ? linkBreadth : 0,
            path: '',
            overlapid,
            color,
            subcolor,
        };
        return extendedLink;
    });

    extendedLinks.forEach((link) => {
        if (link.sourceNode.x === link.targetNode.x) {
            const startPoint = [link.sourceNode.x + proportionalNodeWidth, link.sourceNode.height / 2 + link.sourceNode.y - nodeWidth / 2] as const;
            const endPoint = [link.targetNode.x + proportionalNodeWidth, link.targetNode.height / 2 + link.targetNode.y - nodeWidth / 2] as const;

            const data = [startPoint, [startPoint[0] + 5, startPoint[1]], [startPoint[0] + 20, (endPoint[1] - startPoint[1]) / 2 + startPoint[1]], [endPoint[0] + 5, endPoint[1]], endPoint] as [
                number,
                number
            ][];
            //https://snyk.io/advisor/npm-package/d3-shape/functions/d3-shape.curveCardinal
            const path = line().curve(curveCardinal.tension(0.2))(data);

            if (!path) return;

            link.path = path;

            return;
        }
    });

    // make linkDict
    const sourceNodeNameLinksDict: { [node: string]: SankeyLinkExtended[] } = {};

    extendedLinks.forEach((link) => {
        if (link.sourceNode.name! in sourceNodeNameLinksDict) {
            sourceNodeNameLinksDict[link.sourceNode.name!].push(link);
        } else {
            sourceNodeNameLinksDict[link.sourceNode.name!] = [link];
        }
    });

    const targetNodeNameLinksDict: { [node: string]: SankeyLinkExtended[] } = {};

    extendedLinks.forEach((link) => {
        if (link.targetNode.name! in targetNodeNameLinksDict) {
            targetNodeNameLinksDict[link.targetNode.name!].push(link);
        } else {
            targetNodeNameLinksDict[link.targetNode.name!] = [link];
        }
    });

    for (const [nodeName, linksOfNode] of Object.entries(sourceNodeNameLinksDict)) {
        // 현재는 크기가 큰 순서대로 소팅이 되고있는 상황.
        if (isSort) {
            linksOfNode.sort((a, b) => {
                let tempNumber = 0;

                if (a.color !== 'grayLinkColor') {
                    if (b.color !== 'grayLinkColor') {
                        tempNumber = a.target - b.target;
                    } else {
                        tempNumber = -1;
                    }
                } else {
                    if (b.color !== 'grayLinkColor') {
                        tempNumber = 1;
                    } else {
                        tempNumber = a.target - b.target;
                    }
                }
                return tempNumber;
            });
        }

        let tempYPosition: number = 0;
        linksOfNode.forEach((link) => {
            link.sourceNodeYPosition = tempYPosition;
            tempYPosition += link.value;
        });
    }

    for (const [nodeName, linksOfNode] of Object.entries(targetNodeNameLinksDict)) {
        if (isSort) {
            linksOfNode.sort((a, b) => {
                let tempNumber = 0;

                if (a.color !== 'grayLinkColor') {
                    if (b.color !== 'grayLinkColor') {
                        tempNumber = a.source - b.source;
                    } else {
                        tempNumber = -1;
                    }
                } else {
                    if (b.color !== 'grayLinkColor') {
                        tempNumber = 1;
                    } else {
                        tempNumber = a.source - b.source;
                    }
                }
                return tempNumber;
            });
        }
        let tempYPosition: number = 0;
        linksOfNode.forEach((link, orderIndex) => {
            link.targetNodeYPosition = tempYPosition;
            tempYPosition += link.value;
        });
    }

    extendedLinks.forEach((link) => {
        const sourceCenter = (d: typeof extendedLinks[0]) => [d.sourceNode.x + proportionalNodeWidth, d.sourceNode.y + d.sourceNodeYPosition + d.value / 2];
        const targetCenter = (d: typeof extendedLinks[0]) => [d.targetNode.x, d.targetNode.y + d.targetNodeYPosition + d.value / 2];
        // d3-linkHorizontal
        let path = linkHorizontal<typeof extendedLinks[0], {}>().source(sourceCenter).target(targetCenter)(link);
        if (!path) return null;

        link.path = path;
    });

    extendedLinks.sort((link) => (link.color !== 'grayLinkColor' ? 1 : -1)); // zIndex

    return extendedLinks;
};
