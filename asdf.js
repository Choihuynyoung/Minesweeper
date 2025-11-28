// 숫자 칸 클릭 시 주변 깃발 확인 후 자동 열기
function openCell(r,c){
    if(gameOver || board[r][c].flag || board[r][c].open) return;
    if(firstClick){
        placeMines(r,c);
        firstClick=false;
    }

    const cell = board[r][c];

    // 숫자 칸 클릭 → 주변 깃발 수 확인
    if(cell.open && cell.count>0){
        let flaggedCount=0;
        for(let dr=-1;dr<=1;dr++){
            for(let dc=-1;dc<=1;dc++){
                let nr=r+dr, nc=c+dc;
                if(nr>=0 && nr<rows && nc>=0 && nc<cols){
                    if(board[nr][nc].flag) flaggedCount++;
                }
            }
        }
        if(flaggedCount===cell.count){
            // 깃발 외 안전 칸 열기
            for(let dr=-1;dr<=1;dr++){
                for(let dc=-1;dc<=1;dc++){
                    let nr=r+dr, nc=c+dc;
                    if(nr>=0 && nr<rows && nc>=0 && nc<cols){
                        if(!board[nr][nc].open && !board[nr][nc].flag){
                            openCell(nr,nc);
                        }
                    }
                }
            }
            return;
        }
    }

    // 일반 열기
    cell.open=true;
    if(cell.mine){
        revealMines();
        document.getElementById("message").textContent="💥 게임 오버!";
        gameOver=true;
        renderBoard();
        return;
    }
    if(cell.count===0) openAdjacent(r,c);
    renderBoard();
    checkWin();
}
