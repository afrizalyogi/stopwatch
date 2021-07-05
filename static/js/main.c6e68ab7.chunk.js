(this.webpackJsonpstopwatch=this.webpackJsonpstopwatch||[]).push([[0],{14:function(e,t,i){},16:function(e,t,i){"use strict";i.r(t);var s=i(2),n=i(1),a=i(5),r=i(6),c=i(8),o=i(7),h=i(3),l=i.n(h),b=i(9),u=i.n(b),d=(i(14),function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,17)).then((function(t){var i=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,r=t.getTTFB;i(e),s(e),n(e),a(e),r(e)}))}),j=i(0),m=function(e,t){var i,s,n,a;return s=(new Date).getTime()+t,n=null,a=function(){return s+=t,n=setTimeout(a,s-(new Date).getTime()),e()},i=function(){return clearTimeout(n)},n=setTimeout(a,s-(new Date).getTime()),{cancel:i}},f=function(e){Object(c.a)(i,e);var t=Object(o.a)(i);function i(){return Object(a.a)(this,i),t.apply(this,arguments)}return Object(r.a)(i,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"length-control",children:[Object(j.jsx)("div",{id:this.props.titleID,children:this.props.title}),Object(j.jsx)("button",{id:this.props.minID,className:"btn-level",onClick:this.props.onClick,value:"-",children:Object(j.jsx)("i",{className:"fas fa-minus fa-2x"})}),Object(j.jsxs)("div",{id:this.props.lengthID,className:"btn-level",children:[this.props.length,"m"]}),Object(j.jsx)("button",{id:this.props.addID,className:"btn-level",onClick:this.props.onClick,value:"+",children:Object(j.jsx)("i",{className:"fas fa-plus fa-2x"})})]})}}]),i}(l.a.Component),p=function(e){Object(c.a)(i,e);var t=Object(o.a)(i);function i(e){var s;return Object(a.a)(this,i),(s=t.call(this,e)).state={brkLength:5,seshLength:25,timerState:"stopped",timerType:"Session",timer:1500,intervalID:""},s.setBrkLength=s.setBrkLength.bind(Object(n.a)(s)),s.setSeshLength=s.setSeshLength.bind(Object(n.a)(s)),s.lengthControl=s.lengthControl.bind(Object(n.a)(s)),s.timerControl=s.timerControl.bind(Object(n.a)(s)),s.beginCountDown=s.beginCountDown.bind(Object(n.a)(s)),s.decrementTimer=s.decrementTimer.bind(Object(n.a)(s)),s.phaseControl=s.phaseControl.bind(Object(n.a)(s)),s.warning=s.warning.bind(Object(n.a)(s)),s.buzzer=s.buzzer.bind(Object(n.a)(s)),s.switchTimer=s.switchTimer.bind(Object(n.a)(s)),s.clockify=s.clockify.bind(Object(n.a)(s)),s.reset=s.reset.bind(Object(n.a)(s)),s}return Object(r.a)(i,[{key:"setBrkLength",value:function(e){this.lengthControl("brkLength",e.currentTarget.value,this.state.brkLength,"Session")}},{key:"setSeshLength",value:function(e){this.lengthControl("seshLength",e.currentTarget.value,this.state.seshLength,"Break")}},{key:"lengthControl",value:function(e,t,i,n){if("running"!==this.state.timerState)if(this.state.timerType===n)"-"===t&&1!==i?this.setState(Object(s.a)({},e,i-1)):"+"===t&&60!==i&&this.setState(Object(s.a)({},e,i+1));else if("-"===t&&1!==i){var a;this.setState((a={},Object(s.a)(a,e,i-1),Object(s.a)(a,"timer",60*i-60),a))}else if("+"===t&&60!==i){var r;this.setState((r={},Object(s.a)(r,e,i+1),Object(s.a)(r,"timer",60*i+60),r))}}},{key:"timerControl",value:function(){"stopped"===this.state.timerState?(this.beginCountDown(),this.setState({timerState:"running"})):(this.setState({timerState:"stopped"}),this.state.intervalID&&this.state.intervalID.cancel())}},{key:"beginCountDown",value:function(){var e=this;this.setState({intervalID:m((function(){e.decrementTimer(),e.phaseControl()}),1e3)})}},{key:"decrementTimer",value:function(){this.setState({timer:this.state.timer-1})}},{key:"phaseControl",value:function(){var e=this.state.timer;this.warning(e),this.buzzer(e),e<0&&(this.state.intervalID&&this.state.intervalID.cancel(),"Session"===this.state.timerType?(this.beginCountDown(),this.switchTimer(60*this.state.brkLength,"Break")):(this.beginCountDown(),this.switchTimer(60*this.state.seshLength,"Session")))}},{key:"warning",value:function(e){e<10?this.setState({alarmColor:{color:"#ff5555"}}):this.setState({alarmColor:{color:"#fff"}})}},{key:"buzzer",value:function(e){3===e&&this.audioBeep.play()}},{key:"switchTimer",value:function(e,t){this.setState({timer:e,timerType:t})}},{key:"clockify",value:function(){var e=Math.floor(this.state.timer/60),t=this.state.timer-60*e;return(e=e<10?"0"+e:e)+":"+(t=t<10?"0"+t:t)}},{key:"reset",value:function(){this.setState({brkLength:5,seshLength:25,timerState:"stopped",timerType:"Session",timer:1500,intervalID:""}),this.state.intervalID&&this.state.intervalID.cancel(),this.audioBeep.pause(),this.audioBeep.currentTime=0}},{key:"render",value:function(){var e=this;return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{id:"box-center",children:[Object(j.jsx)("div",{id:"timer",children:Object(j.jsxs)("div",{id:"timer-wrapper",children:[Object(j.jsx)("div",{id:"timer-label",children:this.state.timerType}),Object(j.jsx)("div",{id:"time-left",style:this.state.alarmColor,children:this.clockify()})]})}),Object(j.jsx)(f,{addID:"break-increment",length:this.state.brkLength,lengthID:"break-length",minID:"break-decrement",onClick:this.setBrkLength,title:"Break Time",titleID:"break-label"}),Object(j.jsx)(f,{addID:"session-increment",length:this.state.seshLength,lengthID:"session-length",minID:"session-decrement",onClick:this.setSeshLength,title:"Session Time",titleID:"session-label"}),Object(j.jsxs)("div",{id:"timer-control",children:[Object(j.jsxs)("button",{id:"start_stop",onClick:this.timerControl,children:[Object(j.jsx)("i",{className:"fas fa-pause fa-2x"}),Object(j.jsx)("i",{className:"fas fa-play fa-2x"})]}),Object(j.jsx)("button",{id:"reset",onClick:this.reset,children:Object(j.jsx)("i",{className:"fas fa-redo-alt fa-2x"})})]})]}),Object(j.jsxs)("div",{id:"credit",children:[" ",Object(j.jsx)("i",{className:"fas fa-code"}),"\xa0 with \xa0",Object(j.jsx)("i",{className:"fas fa-heart"}),"\xa0 by ",Object(j.jsx)("a",{href:"https://afrizalyogi.github.io",target:"_blank",rel:"noopener noreferrer",children:"Afrizal Yogi"})]}),Object(j.jsx)("audio",{id:"beep",preload:"auto",ref:function(t){e.audioBeep=t},src:"https://cdn.jsdelivr.net/gh/afrizalyogi/stopwatch@main/src/assets/BeepSound.wav"})]})}}]),i}(l.a.Component);u.a.render(Object(j.jsx)(p,{}),document.getElementById("app")),d()}},[[16,1,2]]]);
//# sourceMappingURL=main.c6e68ab7.chunk.js.map