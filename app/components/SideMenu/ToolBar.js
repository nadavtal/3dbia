import React, { useState } from 'react'

const Toolbar = ({}) => {

    return <div className="p-0">
        <FuseShortcuts className="px-16" />

        <FuseSearch />
        
        <QuickPanelToggleButton />
    </div>
}