import React,{Component} from 'react';

class Games extends Component{
    state= {
        answer:["1","1","5","5","6","6","5"],
        userInp:[],
        userShow:[],
        checked:false,
        start:true,
        success:false,
        fail:false,
        end:false,
        reset:false,
        time:0,
    }

    componentDidMount(){
        const coupomItem = localStorage.getItem('coupon');
        const showGame = document.querySelector('.game-show');

        window.addEventListener('scroll',()=>{
            const isFixed = window.scrollY > 400;
            // console.log(window.scrollY );

            if(isFixed){
                showGame.classList.add('game-show-active');
            }else{
                showGame.classList.remove('game-show-active');
            }
        })

        if(!!coupomItem){
            this.setState({end:true});
        }else{
            this.setState({end:false});
            this.setState({success:false});
            this.setState({start:false});
            this.setState({userInp:[]});
            this.setState({checked:false});
            this.setState({fail:false});
        }
    }

    // 遊戲開始
    clickStart = ()=>{
        this.setState({start:true});
    }

    // 關閉遊戲
    handleClose = ()=>{
        this.setState({start:false});
    }

    // 挑戰音樂音效執行
    challenge = ()=>{
        this.audio.play();
    }

    // 每個音符點擊事件及音效
    onClick = (e)=>{
        const {userInp,userShow} = this.state;
        const num = e.target.getAttribute('data-id');
        const audio = document.querySelectorAll('audio')[num];
        audio.play();
        userInp.push(num);
        this.setState({userInp});
        // console.log(userInp);

        const inpValue = e.target.getAttribute('data-value');
        userShow.push(inpValue + ' ');
        this.setState({userShow});
    }

    // 判斷對錯
    handleCheck = ()=>{
        const {checked,answer,userInp,success,userShow} = this.state;
        this.setState({checked:true});
        this.setState({userShow:[]});
        const answerLen = answer.length;
        const userInpLen = userInp.length;

        if(answerLen === userInpLen){
            if(answer.toString() === userInp.toString()){
                // console.log(answer.toString());
                    this.setState({success:true});
                    const couponItem = [{coupon:'dulcet-20200710',couponLocalStorage:0}];

                    localStorage.setItem('coupon',JSON.stringify(couponItem));
                    if(localStorage.getItem('coupon').length > 0){
                        const time = new Date();
                        this.timeTemp = setInterval(() => {
                            const newTime = Math.floor((new Date() - time)/1000);
                            // console.log(newTime);
                            this.setState({time:newTime})
                        }, 1000);
                        setTimeout(()=>{
                            this.setState({end:true});
                            // console.log(this.state.end);
                            this.closeTime();
                        },5000)
                    }
            }else{
                this.setState({fail:true});
            }
        }else{
            this.setState({fail:true});
        }
    }

    // 清除倒數計時器
    closeTime = () =>{
        clearInterval(this.timeTemp);
    }

    // 重新挑戰
    handleReset = ()=>{
        this.setState({reset:true});
        this.setState({userInp:[]});
        this.setState({checked:false});
        this.setState({success:false});
        this.setState({fail:false});
        this.setState({userShow:[]});
        setTimeout(()=>{
            this.setState({reset:false});
        },1000)
    }

    render(){
        const {checked,start,success,fail,end,time,reset,userShow,userInp} = this.state;
        const endDisplay = end ? 'none':'block';
        // console.log("end",end);

        const disabled = checked ? 'disabled' : '';
        const restDisplay = success ? 'disabled' : '';

        // 挑戰開始顯示/隱藏
        const startDisplay =  start ? (''): (
            <div className="games-start">
                <button className="games-start-btn" onClick={this.clickStart}>挑戰 Coupon</button>
            </div>
        ) ;

        // 點擊X後小遊戲顯示/隱藏
        const closeDisplay = start ? (
            <div className="games-close">
                <button className="games-close-btn btn btn-outline-secondary" onClick={this.handleClose}>X</button>
            </div>
        ) : ('');

        const display = start ? 'block' : 'none';
        // console.log(display);

        // 點擊音符後顯示點擊的值訊息
        const userClickValue = userInp.length && !checked > 0 ? (
            <div className="alert alert-info alert-btn" role="alert">
                {userShow}
            </div>
        ) : ('');

        // 成功訊息
        const successDisplay = success ? (
            <div className="alert alert-success alert-btn" role="alert">
                <p>恭喜您答對囉~~！！</p>
                <p  style={{marginTop:10}}>Coupon：<span>dulcet-20200710</span></p>
            </div>
        ) : ('');

        // 倒數計時訊息
        const timeDisplay = success ? (
            <p className="games-times">視窗將於<span> {5-time} </span>後關閉</p>
        ) : ('');

        // 失敗訊息
        const failDisplay = fail ? (
            <div className="alert alert-warning alert-btn" role="alert">
                <p>答錯了~請再試試看喔~</p>
            </div>
        ) : ('');

        // 重新挑戰訊息
        const resetShow = reset ? (
            <div className="alert alert-warning alert-btn" role="alert">
                可以重新開始挑戰囉~
            </div>
        ) : ('');

        return(
            <>
            <div id="gamesShow" className="game-show">
                {startDisplay}
                <div className="container games-container" style={{display:endDisplay}}>
                    <div className="games-wrap" style={{display}} >
                    {closeDisplay}
                        <div className="games-exp" >
                            <h2 className="games-exp-h2">遊戲說明：</h2>
                            <p className="games-exp-txt">請點擊【挑戰音樂】聆聽音樂後，點擊出相同音樂即挑戰成功就可獲得<span> Coupon </span>喔！</p>
                        </div>
                        {successDisplay}
                        {failDisplay}
                        {resetShow}
                        {userClickValue}
                        <div className="games-music">
                            <button onClick={this.challenge}>挑戰音樂</button>
                            <audio ref={audio => this.audio = audio}>
                                <source src={require('../../img/games/little_star.mp3')} type="audio/mpeg" ></source>
                            </audio>
                        </div>
                        <div className="games-body ">
                            <button id="do" data-id="1" data-value="Do" onClick={this.onClick} disabled={disabled}>Do
                                <audio>
                                    <source src={require('../../img/games/Do.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="2" data-value="Re" onClick={this.onClick} disabled={disabled}>Re
                                <audio >
                                    <source src={require('../../img/games/Re.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="3" data-value="Mi" onClick={this.onClick} disabled={disabled}>Mi
                                <audio >
                                    <source src={require('../../img/games/Mi.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="4" data-value="Fa" onClick={this.onClick} disabled={disabled}>Fa
                                <audio >
                                    <source src={require('../../img/games/Fa.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="5" data-value="So" onClick={this.onClick} disabled={disabled}>So
                                <audio >
                                    <source src={require('../../img/games/So.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="6" data-value="La" onClick={this.onClick} disabled={disabled}>La
                                <audio >
                                    <source src={require('../../img/games/Na.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                            <button data-id="7" data-value="Si" onClick={this.onClick} disabled={disabled}>Si
                                <audio >
                                    <source src={require('../../img/games/Si.mp3')} type="audio/mpeg" ></source>
                                </audio>
                            </button>
                        </div>
                        <div className="games-btn">
                            <button className="games-check-btn" onClick={this.handleCheck}>確認送出</button>
                            <button className="games-Reset-btn" onClick={this.handleReset} disabled={restDisplay}>重新挑戰</button>
                        </div>
                        {timeDisplay}
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Games;