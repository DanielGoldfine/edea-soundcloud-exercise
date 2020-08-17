import React from 'react';

import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ListControllers({ changePage, changePreviewMode, offset, previewMode, tracks }) {

    const nextBtnClassName = tracks.length !== 0 ? '' : 'mute';
    const prevBtnClassName = offset !== 0 ? '' : 'mute';

    return (
        <section className="list-controllers flex justify-between align-center">
            <section className="paging-btns-container flex align-center">
                <button className={`paging-btn ${prevBtnClassName}`} onClick={() => { changePage('prev') }} ><ArrowBackIosIcon /></button>
                <button className={`paging-btn ${nextBtnClassName}`} onClick={() => { changePage('next') }} ><ArrowForwardIosIcon /></button>
            </section>
            <div className="preview-mode-btns-container flex align-center">
                <div className={`list-btn ${previewMode === 'tile' ? 'mute' : ''}`}>
                    <ListIcon onClick={() => { changePreviewMode('list') }} />
                </div>
                <div className={`tile-btn ${previewMode === 'list' ? 'mute' : ''}`}>
                    <ViewModuleIcon onClick={() => { changePreviewMode('tile') }} />
                </div>
            </div>
        </section>
    );
}