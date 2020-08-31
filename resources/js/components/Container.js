import React, { useState } from 'react';
import {Paint} from './Paint';
import {View} from './View';

export const Container = () =>
{
    const [imgState, setImgState] = useState({
        mode: false,
        centerWidth: 0,
        centerHeight: 0,
        centerStart: 0,
        centerTop: 0,
        underHeight: 0,
        underWidth: 0,
        bottomImgIndex:null,
        imgs: null,
        imgIndex:null,
        imgURL: null,
        imgId: null,
        imgSize: null,
    })

    return (
        <>
            {
                imgState.mode && <Paint imgState={imgState} setImgState={setImgState}/>
            }

            {
                !imgState.mode && <View imgState={imgState} setImgState={setImgState}/>
            }
        </>
    )
}