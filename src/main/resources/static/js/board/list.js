


Array.prototype.slice.call(document.querySelector("select"))
    .forEach(options => {
        if(options.value == '${pager.kind}') options.selected = true;
    })



  
