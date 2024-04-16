import FinalSankey from './views/FinalSankey';
import Header from './components/Header/Header';
import './styles.scss';
import style from './rootStyle.module.scss';
import { SideNavi } from './components/SideNavi/SideNavi';
import { fullData } from './Data';
import { StrictMode, useState } from 'react';
import { SankeyData, SankeyLink, SankeyLinkExtended } from './types';
import { PopUp } from './components/PopUp/PopUp';

export default function App() {
    const [originData, setOriginData] = useState<SankeyData>(fullData);
    const [clickedLink, setClickedLink] = useState<SankeyLinkExtended>();
    const [clickedNodeLinks, setClickedNodeLinks] = useState<SankeyLinkExtended[]>();
    const [clickedButton, setClickedButton] = useState<SankeyLink[]>();
    const [clickedCluster, setClickedCluster] = useState<SankeyData>();
    const [isPopUp, setPopUp] = useState<Boolean>(false);
    const onclick = () => {
        (() => {
            setPopUp(!isPopUp);
        })();
    };

    return (
        <StrictMode>
            <div className={style.root}>
                {isPopUp && PopUp(onclick)}
                {Header(onclick)}
                <div className={style.mainContainer}>
                    <SideNavi
                        clickedNodeLinks={clickedNodeLinks}
                        clickedLink={clickedLink}
                        clickedButton={clickedButton}
                        clickedCluster={clickedCluster}
                        setClickedCluster={setClickedCluster}
                        // @ts-ignore
                        originData={originData}
                        setOriginData={setOriginData}
                    />
                    <FinalSankey
                        originData={originData}
                        setOriginData={setOriginData}
                        setClickedNodeLinks={setClickedNodeLinks}
                        setClickedLink={setClickedLink}
                        setClickedButton={setClickedButton}
                        clickedCluster={clickedCluster}
                    />
                </div>
            </div>
        </StrictMode>
    );
}
