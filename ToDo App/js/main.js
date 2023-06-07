// media query
function myFunction(x) {
    if (x.matches) { // If media query matches
        //   document.body.style.backgroundColor = "orange";
        let add_btn = document.getElementById('add_btn')
        add_btn.innerHTML = 'Add Task'
        add_btn.style.fontFamily = 'Arial'
        add_btn.style.fontWeight = 'bold'
        document.body.style.backgroundColor = "cadetblue";

    } else {
        add_btn.innerHTML = '<i class="fa fa-plus" style="font-size:20px;color:rgb(255, 255, 255)"></i>'
        document.body.style.backgroundColor = "cadetblue";
        document.body.style.backgroundColor = "orange";

    }
}

var x = window.matchMedia("(max-width: 500px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


var wrapper = document.getElementById("wrapper");
let count = 0;
let task_list;
let chkboxArray;
// const lastChild = document.querySelector('.wrapper-child:last-child');

// console.log(wrapper);


var input = document.getElementById("to_do");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        createDiv()
    }
});





if (JSON.parse(localStorage.getItem('task_list'))) {
    task_list = JSON.parse(localStorage.getItem('task_list'));
} else {
    task_list = [];
}

if (JSON.parse(localStorage.getItem('chkboxArray'))) {
    chkboxArray = JSON.parse(localStorage.getItem('chkboxArray'));
} else {
    chkboxArray = [];
}

loadPreviousTasks();

function strikethrough(ele) {
    var grandParent = ele.parentElement.parentElement;
    var thatParticularTextBox = document.querySelector('#' + grandParent.id + ' .' + 'inside_inp');
    var thatParticularchkBox = document.querySelector('#' + grandParent.id + ' .' + 'chkbox');
    var indexNo;
    for (let i = 0; i < chkboxArray.length; i++) {
        const element = chkboxArray[i];
        if (element.id == grandParent.id) {
            indexNo = i;
            break;
        }

    }
    // console.log(indexNo);
    // console.log(chkboxArray);
    if (ele.checked == true) {
        thatParticularTextBox.style.textDecoration = "line-through";
        thatParticularTextBox.style.backgroundColor = '#f9f9f9'
        chkboxArray[indexNo].stat = true;
    } else {
        thatParticularTextBox.style.textDecoration = "none";
        thatParticularTextBox.style.backgroundColor = 'transparent'

        chkboxArray[indexNo].stat = false;
    }

    localStorage.setItem('chkboxArray', JSON.stringify(chkboxArray));
}

function loadPreviousTasks() {
    var taskList = JSON.parse(localStorage.getItem('task_list'));
    chkboxArray = []
    if (taskList) {
        for (var i = 0; i < taskList.length; i++) {
            var task = taskList[i];
            count++;

            var existingDiv = document.querySelector(".wrapper-child:last-child");
            var wrap = document.querySelector(".wrapper-child:last-child");

            if (Number(wrap.id.slice(3)) == 1) {
                wrap.parentElement.style.display = 'block';
                var arr = document.getElementsByClassName('inside_inp');
                var to_do = document.getElementsByClassName('to_do');
                var element = arr[(Number(wrap.id.slice(3)) - 1)];
                // element.innerHTML = task;
                element.value = task;

                wrap.setAttribute('id', 'div' + (Number(wrap.id.slice(3)) + 1));

                var clone = wrap;
                chkboxArray.push({
                    id: clone.id,
                    stat: false
                });
            } else {
                var clone = existingDiv.cloneNode(true);
                clone.style.visibility = 'visible';
                clone.setAttribute('id', 'div' + (Number(wrap.id.slice(3)) + 1));
                wrapper.appendChild(clone);
                chkboxArray.push({
                    id: clone.id,
                    stat: false
                });

                var arr = document.getElementsByClassName('inside_inp');
                var to_do = document.getElementsByClassName('to_do');
                var element = arr[(Number(wrap.id.slice(3)) - 1)];
                // element.innerHTML = task;
                element.value = task;
            }

        }
    }

    var chkStatus = JSON.parse(localStorage.getItem('chkboxArray'));

    if (chkStatus.length != 0) {
        var allChkBoxes = document.getElementsByClassName('chkbox');

        for (var i = 0; i < allChkBoxes.length; i++) {
            var item_ = allChkBoxes[i];
            item_.checked = chkStatus[i].stat;
            strikethrough(item_);
        }
    }
    localStorage.setItem('chkboxArray', JSON.stringify(chkboxArray));

}

function createDiv() {
    // var input = document.getElementById("to_do");

    if (input.value === "") {
        alert("Input cannot be empty!");
        input.style.border = '3px solid red'
        return;
    } else {
        input.style.border = 'none'
        count++;
        duplicateDiv();
        input.value = ""
    }
}

function dltDiv(el) {
    window.navigator.vibrate(100);
    count--;
    var parent_ele = el.parentElement;
    var grand_parent_ele = parent_ele.parentElement;
    var wrapper_child_elements = document.getElementsByClassName('wrapper-child');
    var wrapper_elements = document.getElementsByClassName('wrapper');

    if (count == 0) {
        var toBeRemoved = wrapper_child_elements[0]
        toBeRemoved.classList.add("scale-out");
        setTimeout(() => {
            wrapper_elements[0].style.display = 'none';
            // toBeRemoved.style.transition = 'all .3s'
        }, 300);

        // wrapper_elements[0].style.display = 'none';
        wrapper_child_elements[0].setAttribute('id', 'div' + 1);
    } else {
        // const grandParentElement = document.getElementById("grandParentElement");
        var grandParentElement = grand_parent_ele
        grandParentElement.classList.add("scale-out");
        setTimeout(() => {
            grandParentElement.remove();
        }, 300);
    }

    var task_details = parent_ele.children[1];
    // var index = task_list.indexOf(task_details.innerHTML);
    var index = task_list.indexOf(task_details.value);


    if (index > -1) {
        task_list.splice(index, 1);
        chkboxArray.splice(index, 1);
    }

    localStorage.setItem('task_list', JSON.stringify(task_list));
    localStorage.setItem('chkboxArray', JSON.stringify(chkboxArray));
}

function duplicateDiv() {
    var existingDiv = document.querySelector(".wrapper-child:last-child");
    var wrap = document.querySelector(".wrapper-child:last-child");
    var wrapper_child_elements = document.getElementsByClassName('wrapper-child');
    var toBeRemoved = wrapper_child_elements[0]
    toBeRemoved.classList.remove("scale-out");
    if (Number(wrap.id.slice(3)) == 1) {
        wrap.parentElement.style.display = 'block';
        var particular_inside_input = document.querySelector('#' + wrap.id + ' .inside_inp');
        var element = particular_inside_input;
        // element.innerHTML = document.getElementById('to_do').value;
        element.value = document.getElementById('to_do').value;

        wrap.setAttribute('id', 'div' + (Number(wrap.id.slice(3)) + 1));
        var clone = wrap;
        chkboxArray.push({
            id: clone.id,
            stat: false
        });
        var particular_chkbox = document.querySelector('#' + clone.id + ' .chkbox');
        particular_chkbox.checked = false;
        strikethrough(particular_chkbox);

    } else {
        var clone = existingDiv.cloneNode(true);
        clone.style.visibility = 'visible';
        clone.setAttribute('id', 'div' + (Number(wrap.id.slice(3)) + 1));
        wrapper.appendChild(clone);
        var particular_inside_input = document.querySelector('#' + clone.id + ' .inside_inp');
        var particular_chkbox = document.querySelector('#' + clone.id + ' .chkbox');
        // console.log(particular_chkbox);
        chkboxArray.push({
            id: clone.id,
            stat: false
        });
        particular_chkbox.checked = false;
        strikethrough(particular_chkbox);
        var element = particular_inside_input;
        // element.innerHTML = document.getElementById('to_do').value;
        element.value = document.getElementById('to_do').value;

    }

    // console.log(lastChild);
    // console.log(lastChild);
    // lastChild.style.borderBottom = 'none'
    task_list.push(document.getElementById('to_do').value);
    localStorage.setItem('task_list', JSON.stringify(task_list));
    localStorage.setItem('chkboxArray', JSON.stringify(chkboxArray));
}

let ind=-1;
let val_;
function myFunc() {
    
    event.target.addEventListener("keydown", function (event) {       
             val_ = event.target.value;
    });
    event.target.addEventListener("keyup", function (event) {
        let val = val_
        console.log(val);
        let new_val = event.target.value;
        console.log(new_val);
        let arr_ = JSON.parse(localStorage.getItem('task_list'));

            for (let i = 0; i < arr_.length; i++) {
                const element = arr_[i];
                if(element == val){
                    ind = i;
                    break;
                }
            }
            arr_[ind] = new_val;
            localStorage.setItem('task_list', JSON.stringify(arr_));
        
    });
    

}   