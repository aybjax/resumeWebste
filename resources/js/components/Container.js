import React, { useState } from 'react';
import {Paint} from './Paint';
import {View} from './View';

export const Container = () =>
{
    const [imgState, setImgState] = useState({
        imgId: null,
        mode: false,
        imgURL: null,
        imgs: [],
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