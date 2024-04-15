// Types
import { SankeyData, SankeyLink, SankeyNodeExtended, SankeyLinkExtended } from '../../types/sankey';
import { useState, useEffect } from 'react';
// Components
// Libraries
import {
    LinkGrayColor,
    LinkBlueColor,
    LinkDeepBlueColor,
    LinkGreenColor,
    LinkLightGreenColor,
    LinkOrangeColor,
    LinkRubyColor,
    LinkRedColor,
    LinkTargetColor,
    LinkHighlightTargetColor,
    LinkTargetOneColor,
    LinkTargetTwoColor,
    LinkTargetThreeColor,
    LinkTargetFourColor,
    LinkIntOneColor,
    LinkIntLightOneColor,
    LinkIntLight2OneColor,
    LinkIntLight3OneColor,
    LinkIntTwoColor,
    LinkIntLightTwoColor,
    LinkIntThreeColor,
    LinkIntLightThreeColor,
    LinkIntLight1ThreeColor,
    LinkIntLight2ThreeColor,
    LinkIntFourColor,
    LinkIntFiveColor,
    LinkIntLightFiveColor,
    LinkIntLight2FiveColor,
    LinkRepVisVarColor,
    LinkRepVisTechColor,
} from './SankeyColor';
import { Link } from './Link';
import { Node } from './Node';
import './Sankey.scss';
import { calcSankeyNodes, calcSankeyLinks } from '../../utils/';
import styled from 'styled-components';
const BigBox = styled.g``;

// Props
interface Props {
    width: number;
    height: number;
    paddingTop?: number;
    originData: SankeyData;
    nodeWidth?: number;
    nodeHeight?: number;
    nodeMargin?: number;
    minLinkBreadth?: number;
    maxLinkBreadth?: number;
    setOriginData: React.Dispatch<React.SetStateAction<SankeyData>>;
    setClickedNodeLinks: React.Dispatch<React.SetStateAction<SankeyLinkExtended[] | undefined>>;
    setClickedLink: React.Dispatch<React.SetStateAction<SankeyLinkExtended | undefined>>;
    clickedCluster: SankeyData | undefined;
}

export interface SourceTargetIdLinksDict {
    [sourceTargetId: string]: SankeyLink[];
}
// Component
export const Sankey = ({
    width,
    height,
    originData,
    paddingTop = 0,
    nodeWidth = 20,
    nodeHeight = 20,
    nodeMargin = 5,
    minLinkBreadth,
    maxLinkBreadth,
    setOriginData,
    setClickedNodeLinks,
    setClickedLink,
    clickedCluster,
}: Props) => {
    const [nodes, setNodes] = useState<SankeyNodeExtended[]>([]);
    const [links, setLinks] = useState<SankeyLinkExtended[]>([]);
    const [sourceTargetIdLinksDict, setSourceTargetIdLinksDict] = useState<SourceTargetIdLinksDict>({});

    useEffect(() => {
        const sourceTargetIdLinksDict: SourceTargetIdLinksDict = {};

        originData.links.forEach((link1) => {
            originData.links.forEach((link2) => {
                if (link1.source === link2.source && link1.target === link2.target && link1.valueid === link2.valueid && link1.paperName === link2.paperName) {
                    const sourceTargetId = `${link2.source}-${link2.target}-${link2.valueid}-${link2.paperName}`;

                    if (sourceTargetId in sourceTargetIdLinksDict) {
                        const alreadySameLink = sourceTargetIdLinksDict[sourceTargetId].find((alreadyLink) => alreadyLink === link2);
                        if (!alreadySameLink) {
                            sourceTargetIdLinksDict[sourceTargetId].push(link2);
                        }
                    } else {
                        sourceTargetIdLinksDict[sourceTargetId] = [link2];
                    }
                }
            });
        });

        const mergedLinks = [] as SankeyLink[];
        for (const [sourceTargetId, sameSourceTargetLinks] of Object.entries(sourceTargetIdLinksDict)) {
            const mergedLink = sameSourceTargetLinks.reduce<SankeyLink>(
                (mergedLink, partLink) => {
                    mergedLink.value += partLink.value;

                    return mergedLink;
                },
                { ...sameSourceTargetLinks[0], value: 0 }
            );
            mergedLinks.push(mergedLink);
        }

        const renderingData: SankeyData = { ...originData };

        setSourceTargetIdLinksDict(sourceTargetIdLinksDict);

        const nodes = calcSankeyNodes(renderingData, width, height, paddingTop, nodeWidth, nodeHeight, nodeMargin, maxLinkBreadth);

        setNodes(nodes);

        const links = calcSankeyLinks(renderingData, height, nodes, nodeWidth, minLinkBreadth, maxLinkBreadth);

        setLinks(links);
    }, [originData]);
    const columnss = ['', 'Paper', 'Target', 'Intermediation', 'Representation', 'Vis Var&Tech'];

    return (
        <svg
            onClick={() => {
                setClickedLink(undefined);
                setClickedNodeLinks(undefined);
            }}
            className="size"
            viewBox="0 0 2000 1850"
        >
            <LinkGrayColor />
            <LinkBlueColor />
            <LinkDeepBlueColor />
            <LinkGreenColor />
            <LinkLightGreenColor />
            <LinkOrangeColor />
            <LinkRubyColor />
            <LinkRedColor />
            <LinkTargetColor />
            <LinkHighlightTargetColor />
            <LinkTargetOneColor />
            <LinkTargetTwoColor />
            <LinkTargetThreeColor />
            <LinkTargetFourColor />
            <LinkIntOneColor />
            <LinkIntLightOneColor />
            <LinkIntLight2OneColor />
            <LinkIntLight3OneColor />
            <LinkIntTwoColor />
            <LinkIntLightTwoColor />
            <LinkIntThreeColor />
            <LinkIntLightThreeColor />
            <LinkIntLight1ThreeColor />
            <LinkIntLight2ThreeColor />
            <LinkIntFourColor />
            <LinkIntFiveColor />
            <LinkIntLightFiveColor />
            <LinkIntLight2FiveColor />
            <LinkRepVisVarColor />
            <LinkRepVisTechColor />
            {columnss.map((column, i) => (
                <BigBox key={`column-${i}`}>
                    <text style={{ fontSize: '16px', fontWeight: '650' }} className="coltext" x={450 * i - 428.5} y={(height as number) * 0.02} textAnchor="middle">
                        {`${column}`}
                    </text>
                </BigBox>
            ))}
            {nodes.map((node, i) => (
                <Node
                    //@ts-ignore
                    className="node"
                    key={`node-${i}`}
                    node={node}
                    links={links}
                    width={width}
                    height={height}
                    originData={originData}
                    sourceTargetIdLinksDict={sourceTargetIdLinksDict}
                    setOriginData={setOriginData}
                    setClickedNodeLinks={setClickedNodeLinks}
                    setClickedLink={setClickedLink}
                ></Node>
            ))}

            {links.map((link, i) => (
                // @ts-ignore
                <Link
                    key={`link-${i}`}
                    nodes={nodes}
                    link={link}
                    links={links}
                    originData={originData}
                    sourceTargetIdLinksDict={sourceTargetIdLinksDict}
                    setOriginData={setOriginData}
                    setClickedLink={setClickedLink}
                    setClickedNodeLinks={setClickedNodeLinks}
                />
            ))}
        </svg>
    );
};
