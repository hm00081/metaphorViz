import { SankeyData, SankeyNodeExtended, SankeyLinkExtended } from '../../types';

export const calcSankeyNodes = (
    data: SankeyData,
    width: number,
    height: number,
    paddingTop: number,
    nodeWidth: number,
    nodeHeight: number,
    nodeMargin: number,
    maxLinkBreadth?: number,
    link?: SankeyLinkExtended[]
    // links?: SankeyLinkExtended[]
): SankeyNodeExtended[] => {
    // Extract to const so its in a closure
    const { nodes, links } = data;

    // Calc proportional size value
    const propPaddingTop = paddingTop * (height / 100);
    const propNodeWidth = nodeWidth * (height / 100);
    let propNodeHeight = nodeHeight * (height / 100);
    const propNodeMargin = nodeMargin * (height / 100);
    const propMaxLinkBreadth = maxLinkBreadth && maxLinkBreadth * (height / 100);

    // Extend nodes data
    //@ts-ignore
    const extendedNodes: SankeyNodeExtended[] = nodes.map((node, i) => ({
        ...node,
        index: i,
        input: 0,
        output: 0,
        value: 0,
        links,
        x: 0,
        y: 0,
        width: propNodeWidth,
        height: propNodeHeight,
        sourceNodeType: 0,
        targetNodeType: 0,
        nodeOrderIndex: 0,
    }));
    //console.log('extendedNodes', extendedNodes);
    // Calc value for each node
    links.forEach((link) => {
        extendedNodes[link.source].output += link.value;

        extendedNodes[link.target].input += link.value;
    });

    extendedNodes.forEach((node) => (node.value = Math.max(node.input, node.output)));

    // Filter all columns
    const columns = nodes.map((node) => node.type).filter((type, pos, arr) => arr.indexOf(type) === pos);
    let largestColumnValue = 0;

    columns.forEach((column) => {
        const columnNodes = extendedNodes.filter((node) => node.type === column);

        // Calc value of column
        let columnValue = 0;

        columnNodes.forEach((node) => {
            columnValue += node.value;
        });

        if (columnValue > largestColumnValue) largestColumnValue = columnValue;
    });

    // Calc column width
    const columnWidth = width / (columns.length - 1);
    // Calc nodes positions
    columns.forEach((column, i) => {
        // 각 columnNodes의 객체 데이터로 필터링해줌
        const columnNodes = extendedNodes.filter((node) => node.type === column);
        let columnXPos = 0;

        // Set x pos only for center and last nodes
        if (i === columns.length - 1) columnXPos = columnWidth * i - propNodeWidth;
        else if (i > 0) columnXPos = columnWidth * i + propNodeWidth;

        // Calculate starting position for node - alignment center
        const entityHeight = (propMaxLinkBreadth && propMaxLinkBreadth > propNodeHeight ? propMaxLinkBreadth : propNodeHeight) + propNodeMargin;
        // start Node y position
        const startP = height / 2 - (entityHeight * columnNodes.length) / 2 + propPaddingTop;

        let currYPos = startP;
        //node margin
        const nextPosition = propMaxLinkBreadth && propMaxLinkBreadth > propNodeHeight ? propMaxLinkBreadth + propNodeMargin + 3 : propNodeHeight + propNodeMargin + 3;
        const y0Pos = propMaxLinkBreadth ? (propMaxLinkBreadth - propNodeWidth) / 2 + propPaddingTop : propPaddingTop;

        const nodePositionAdjustments = {
            Target: { x: columnXPos + 450, yAdjustments: { '0': -25, '1': -10, '2': 5, '3': 20, '4': 35 } },
            Intermediation: { x: 900, yAdjustments: { '0': -200, '1': -170, '2': -140, '3': -110, '4': -80 } },
            Representation: { x: 1350, yAdjustments: { '0': -70, '1': -50, '2': -30, '3': -10 } },
            'Vis var&tech': { x: 1800, yAdjustments: { '0': -180, '1': 50 } },
            Paper: { x: 0, yAdjustments: { default: y0Pos * 8.5 } },
        };

        function adjustNodePosition(node: SankeyNodeExtended, currYPos: number, columnXPos: number) {
            //@ts-ignore
            const typeAdjustments = nodePositionAdjustments[node.type];
            if (typeAdjustments) {
                node.x = typeAdjustments.x;
                const yAdjustment = typeAdjustments.yAdjustments[node.subtype] || typeAdjustments.yAdjustments['default'];
                if (yAdjustment !== undefined) {
                    node.y = currYPos + yAdjustment;
                } else {
                    node.y = currYPos;
                }
            }
        }
        // Usage in your existing loop
        columnNodes.forEach((node) => {
            const extendedNode = extendedNodes[node.index];
            adjustNodePosition(extendedNode, currYPos, columnXPos);
            const nextPos = node.value + propNodeMargin;
            currYPos += nextPos;
        });

        // node.value가 높은 순으로 각 열에서 나열
        const nodeValueDict: { [node: string]: SankeyNodeExtended[] } = {};
        extendedNodes.forEach((node) => {
            if (node.name! in nodeValueDict) {
                nodeValueDict[node.name!].push(node);
            } else {
                nodeValueDict[node.name!] = [node];
            }
        });
        // sort [key, value] entires.
        for (const [nodeName, nodeValue] of Object.entries(nodeValueDict)) {
            nodeValue.sort((a, b) => b.value - a.value);
        }

        // Fix collisions for node with y = 0
        const y0Nodes = extendedNodes.filter((node) => node.y === y0Pos);

        y0Nodes.forEach((node) => {
            const y0ColumnNodes = y0Nodes.filter((y0Node) => y0Node.x === node.x);
            if (y0ColumnNodes.length < 2) return;

            let yPos = y0Pos;

            y0ColumnNodes.forEach((y0ColumnNode) => {
                extendedNodes[y0ColumnNode.index].y = yPos;

                yPos += nextPosition;
            });
        });
        // Error Checking
    });

    // Return calculated nodes
    return extendedNodes;
};
