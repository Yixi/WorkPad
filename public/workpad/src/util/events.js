workpad.util.Events = Base.extend({
    on:function(eventName,handler){
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(handler);
        return this;
    },

    off:function(eventName,handler){
        this.events = this.events || {};
        var i = 0,
            handlers,
            newHandlers;
        if(eventName){
            handlers = this.events[eventName] || [];
            newHandlers = [];
            for(; i<handlers.length;i++){
                if(handlers[i] !== handler && handler){
                    newHandlers.push(handlers[i]);
                }
            }
            this.events[eventName] = newHandlers;
        }else{
            //if eventName is empty , clean up all events.
            this.events = {};
        }
        return this;
    },

    fire:function(eventName,payload){
        this.events = this.events || {};
        var handlers = this.events[eventName] || [],
            i = 0;
        for(;i<handlers.length;i++){
            handlers[i].call(this,payload);
        }
        return this;
    }
});
