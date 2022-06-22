import { SankeyData } from '../types/sankey';

const RRR19: SankeyData = {
    nodes: [],

    links: [
        {
            source: 143,
            target: 12,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 143,
            target: 14,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 143,
            target: 15,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 143,
            target: 12,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 143,
            target: 14,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 143,
            target: 15,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 143,
            target: 19,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_3',
        },
        {
            source: 143,
            target: 21,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_4',
        },
        {
            source: 143,
            target: 12,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 143,
            target: 14,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 143,
            target: 15,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 12,
            target: 41,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 14,
            target: 41,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 15,
            target: 41,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 41,
            target: 61,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 61,
            target: 84,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 61,
            target: 86,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 61,
            target: 92,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_1',
        },
        {
            source: 12,
            target: 42,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 14,
            target: 42,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 15,
            target: 42,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 42,
            target: 61,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 61,
            target: 77,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_2',
        },
        {
            source: 19,
            target: 43,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_3',
        },
        {
            source: 43,
            target: 61,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_3',
        },
        {
            source: 61,
            target: 77,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_3',
        },
        {
            source: 61,
            target: 94,
            value: 1,
            valueid: 'targetbb',
            process: 'RRR19_3',
        },
        {
            source: 21,
            target: 46,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_4',
        },
        {
            source: 46,
            target: 75,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_4',
        },
        {
            source: 75,
            target: 77,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_4',
        },
        {
            source: 75,
            target: 98,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_4',
        },
        {
            source: 12,
            target: 46,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 14,
            target: 46,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 15,
            target: 46,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 46,
            target: 60,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 60,
            target: 77,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
        {
            source: 60,
            target: 98,
            value: 1,
            valueid: ['targetbb', 'repf'],
            process: 'RRR19_5',
        },
    ],
    status: [
        {
            status: 1,
        },
    ],
};

RRR19.links.forEach((link, index) => {
    link.paperName = 'RRR19';
    link.id = `RRR19-${index}`;
});

export { RRR19 };
