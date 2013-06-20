/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 *
 * Author: liuyixi
 *
 * Copyright (c) 2013 Yixi
 *
 */

var workpad = {
    version: "@VERSION",

    // namespaces
    util:       {},    //for util language extend
    dom:        {},    //extend dom method
    commands:   {},    // command center
    ui:         {},    // UI library , like the drag and drop sort library...
    views:      {},    // the view layer
    log:        {},    // the process the data log.
    data:       {},    // make a sync josn tree data about the workpad content in memory.

    EMPTY_FUNCTION:function(){},

    ELEMENT_NODE:1,
    TEXT_NODE:3,

    KEYS:{
        BACKSPACE_KEY:  8,
        TAB_KEY:        9,
        ENTER_KEY:      13,
        ESCAPE_KEY:     27,
        SPACE_KEY:      32,
        END_KEY:        35,
        HOME_KEY:       36,
        LEFT_KEY:       37,
        UP_KEY:         38,
        RIGHT_KEY:      39,
        DOWN_KEY:       40,
        DELETE_KEY:     46,

        A_KEY:          65,
        C_KEY:          67,
        X_KEY:          88,
        V_KEY:          86,
        Z_KEY:          90
    }
};