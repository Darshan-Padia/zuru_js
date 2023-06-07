let count = 0
var turn = 1
let won = false
function entry(el) {
    if (turn == 1) {
        count++
        turn = 2;
        let id = el.id;
        let whichBtn = document.getElementById(id)
        whichBtn.innerHTML = 'X'
        whichBtn.style.fontSize = 'xxx-large'
        whichBtn.style.fontWeight = '900'
        whichBtn.style.transition = 'all .3s'
        whichBtn.style.backgroundColor = '#f5ecec'
        whichBtn.disabled = true
        whichBtn.style.color = 'black'

        whichBtn.style.opacity = '1 !important'


        
        winner()
        
    } else {
        count++
        turn = 1
        let id = el.id;
        let whichBtn = document.getElementById(id)
        whichBtn.innerHTML = 'O'
        whichBtn.style.fontSize = 'xxx-large'
        whichBtn.style.fontWeight = '900'
        whichBtn.style.transition = 'all .3s'
        whichBtn.disabled = true
        whichBtn.style.backgroundColor = '#f5ecec'
        whichBtn.style.color = 'black '

        whichBtn.style.opacity = '1 !important'


        
        winner()
    }
}

function reset() {
    allBtns = document.getElementsByClassName('wrapper')
    for (let index = 0; index < allBtns.length; index++) {
        allBtns[index].disabled = false
        allBtns[index].innerHTML = ''
        allBtns[index].style.color = 'black'
        allBtns[0].style.backgroundColor = '#f5ecec !important'
    }
    turn = 1
    count = 0
    won = false
    let displayWin = document.getElementById('turn')

    displayWin.innerHTML = ''

}

function winner() {

    let winning_array = [[0,1,2] , [3,4,5] , [6,7,8] , [0,4,8] , [2,4,6] , [0,3,6] , [1,4,7] , [2,5,8] ]

    // console.log('called');
    let displayWin = document.getElementById('turn')
    allBtns = document.getElementsByClassName('wrapper')
    console.log(allBtns);
    for(let i = 0 ;  i < winning_array.length ; i++){
        if (allBtns[winning_array[i][0]].innerHTML == 'X' && allBtns[winning_array[i][1]].innerHTML == 'X' && allBtns[winning_array[i][2]].innerHTML == 'X'){
            let wonPlayer = 'PLAYER 1'
            displayWin.innerHTML = wonPlayer + ' won the game'
            displayWin.style.fontSize = 'x-large'
            displayWin.style.fontFamily = 'Arial'
            // alert(wonPlayer + ' won the game')
            allBtns[winning_array[i][0]].style.backgroundColor = 'black !important'
            allBtns[winning_array[i][0]].style.color = 'red'
            allBtns[winning_array[i][1]].style.backgroundColor = 'white !important'
            allBtns[winning_array[i][1]].style.color = 'red'
            allBtns[winning_array[i][2]].style.backgroundColor = 'white !important'
            allBtns[winning_array[i][2]].style.color = 'red'
    
            for (let index = 0; index < allBtns.length; index++) {
                allBtns[index].disabled = true
        
            }
            won = true
        }
        else if (allBtns[winning_array[i][0]].innerHTML == 'O' && allBtns[winning_array[i][1]].innerHTML == 'O' && allBtns[winning_array[i][2]].innerHTML == 'O'){
            let wonPlayer = 'PLAYER 2'
            displayWin.innerHTML = wonPlayer + ' won the game'
            displayWin.style.fontSize = 'x-large'
            displayWin.style.fontFamily = 'Arial'
            // alert(wonPlayer + ' won the game')
            allBtns[winning_array[i][0]].style.backgroundColor = 'white !important'
            allBtns[winning_array[i][0]].style.color = 'green'
            allBtns[winning_array[i][1]].style.backgroundColor = 'white !important'
            allBtns[winning_array[i][1]].style.color = 'green' 
            allBtns[winning_array[i][2]].style.backgroundColor = 'white !important'
            allBtns[winning_array[i][2]].style.color = 'green'
    
            for (let index = 0; index < allBtns.length; index++) {
                allBtns[index].disabled = true
        
            }
            won = true


        } else  if (count == 9 && !won) {
            displayWin.innerHTML = 'The Game is drawn'
            displayWin.style.fontSize = 'x-large'
            displayWin.style.fontFamily = 'Arial'
            

        }
    }
    // console.log(count)
    
  
}