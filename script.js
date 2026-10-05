'use strict';
// Navegación: sin JavaScript los enlaces siguen visibles.
document.body.classList.add('js');
const menu=document.querySelector('#menu'),nav=document.querySelector('#nav');
if(menu&&nav){
 const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menú';};
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Cerrar':'Menú';});
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){close();menu.focus();}});
}
// Actividad educativa: no diagnostica ni propone tratamientos.
const questions=[
 {question:'Antes de ir al veterinario, ¿qué información es útil llevar?',answers:['Su historial, medicamentos y mis preguntas.','Solo su juguete favorito.','No hace falta preparar nada.'],correct:0,explanation:'Su historial y tus observaciones ayudan a entender el contexto. Un objeto familiar puede acompañarlo, pero no sustituye la información.'},
 {question:'Mi mascota se pone muy nerviosa en las visitas. ¿Qué hago primero?',answers:['Le doy un medicamento que tengo en casa.','Lo comento con la clínica antes de ir.','Lo obligo a acostumbrarse de golpe.'],correct:1,explanation:'El equipo puede ayudarte a planificar la visita según sus necesidades. No improvises medicación ni fuerces situaciones que le generan miedo.'},
 {question:'Durante la consulta, no entiendo una indicación. ¿Qué conviene hacer?',answers:['Asentir y buscar después en redes sociales.','Cambiar la indicación por mi cuenta.','Pedir que me la expliquen de nuevo.'],correct:2,explanation:'Preguntar ayuda a seguir el plan con claridad. Puedes pedir instrucciones por escrito y confirmar qué hacer si aparecen dudas.'},
 {question:'¿Cómo se organiza el cuidado preventivo?',answers:['Con un plan individual acordado con su veterinario.','Con el mismo calendario para todos los animales.','Copiando lo que hace otra familia.'],correct:0,explanation:'Las necesidades cambian según la etapa de vida y el contexto. El veterinario puede adaptar el plan a tu mascota.'},
 {question:'¿Qué demuestra este juego al terminar?',answers:['Que mi mascota está sana.','Que he aprendido ideas generales de cuidado.','Que puedo decidir tratamientos sin ayuda.'],correct:1,explanation:'Aprender es útil, pero un juego no sustituye una evaluación veterinaria ni permite saber cómo está la salud de un animal.'}
];
let questionIndex=0,score=0,answered=false;
const options=document.querySelector('#quiz-options'),questionTitle=document.querySelector('#quiz-question'),feedback=document.querySelector('#quiz-feedback'),next=document.querySelector('#quiz-next'),finish=document.querySelector('#quiz-finish');
function renderQuestion(){
 if(!options)return;
 answered=false;const question=questions[questionIndex];
 document.querySelector('#quiz-position').textContent=`Pregunta ${questionIndex+1} de ${questions.length}`;
 document.querySelector('#quiz-score').textContent=`${score} ${score===1?'acierto':'aciertos'}`;
 document.querySelector('#quiz-progress').value=questionIndex;
 questionTitle.textContent=question.question;questionTitle.hidden=false;options.hidden=false;options.replaceChildren();feedback.hidden=true;next.hidden=true;finish.hidden=true;
 question.answers.forEach((answer,index)=>{const button=document.createElement('button');button.type='button';button.textContent=answer;button.addEventListener('click',()=>selectAnswer(index));options.append(button);});
}
function selectAnswer(selected){
 if(answered)return;
 answered=true;const question=questions[questionIndex],correct=selected===question.correct;if(correct)score++;
 options.querySelectorAll('button').forEach((button,index)=>{button.disabled=true;if(index===question.correct)button.classList.add('correct');else if(index===selected)button.classList.add('incorrect');});
 feedback.textContent=(correct?'¡Bien pensado! ':'Vamos a aprender: ')+question.explanation;feedback.hidden=false;
 document.querySelector('#quiz-score').textContent=`${score} ${score===1?'acierto':'aciertos'}`;
 document.querySelector('#quiz-progress').value=questionIndex+1;next.textContent=questionIndex===questions.length-1?'Ver mi resultado':'Siguiente pregunta';next.hidden=false;next.focus();
}
if(next)next.addEventListener('click',()=>{
 if(!answered)return;
 if(questionIndex<questions.length-1){questionIndex++;renderQuestion();questionTitle.tabIndex=-1;questionTitle.focus();}
 else{questionTitle.hidden=true;options.hidden=true;feedback.hidden=true;next.hidden=true;finish.hidden=false;document.querySelector('#quiz-position').textContent='Juego completado';document.querySelector('#quiz-summary').textContent=`Has conseguido ${score} de ${questions.length} aciertos. Puedes volver a jugar y repasar las explicaciones.`;finish.querySelector('h3').tabIndex=-1;finish.querySelector('h3').focus();}
});
const restart=document.querySelector('#quiz-restart');if(restart)restart.addEventListener('click',()=>{questionIndex=0;score=0;renderQuestion();questionTitle.focus();});renderQuestion();
const tourSteps=[
 ['PRIMER PASO / NOS CONOCEMOS','Tu mascota tiene una historia.','La consulta empieza por escuchar: sus hábitos, lo que te preocupa y cómo ha estado en casa. Tus observaciones ayudan a contar esa historia.','¿Qué información de su rutina te resulta útil conocer?'],
 ['SEGUNDO PASO / OBSERVAMOS','Cada detalle cuenta.','El profesional valora a tu mascota y te explica qué observa. Las exploraciones o pruebas dependerán de su evaluación y del motivo de la visita.','¿Qué estás revisando y para qué sirve?'],
 ['TERCER PASO / CONVERSAMOS','Entender antes de decidir.','Puedes preguntar por los hallazgos, las opciones y los siguientes pasos. Si algo no queda claro, pide otra explicación.','¿Puedes explicarme las opciones y sus objetivos?'],
 ['CUARTO PASO / ORGANIZAMOS','Salir con un plan claro.','Antes de terminar, confirma las indicaciones, cuándo hacer seguimiento y cómo consultar las dudas que aparezcan en casa.','¿Qué debo observar en casa y cuándo volvemos a hablar?']
];
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-step]').forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));});
 const step=tourSteps[Number(button.dataset.step)];['tour-label','tour-title','tour-description','tour-question'].forEach((id,index)=>document.getElementById(id).textContent=step[index]);
}));
const services={
 revision:['Revisión general','Una oportunidad para conversar sobre el estado de tu mascota y sus hábitos.',['¿Qué información necesitas de su historial?','¿Qué observaciones debería anotar antes de venir?','¿Cuándo conviene programar la siguiente revisión?']],
 prevencion:['Cuidado preventivo','El plan preventivo debe adaptarse a cada animal.',['¿Qué necesita según su etapa de vida?','¿Cómo organizamos el seguimiento?','¿Qué documentos debo conservar?']],
 bienestar:['Hábitos y bienestar','Sus rutinas aportan información importante.',['¿Qué cambios de comportamiento debería comentarte?','¿Cómo puedo preparar una visita más tranquila?','¿Qué actividad es adecuada para su situación?']],
 seguimiento:['Seguimiento y dudas','Una explicación clara ayuda a continuar el cuidado en casa.',['¿Podemos repasar las indicaciones?','¿Qué debo registrar para el seguimiento?','¿Cómo puedo contactar a la clínica si tengo dudas?']]
};
const dialog=document.querySelector('#service-dialog');let previousFocus;
if(dialog){
 document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
  previousFocus=button;const service=services[button.dataset.service];document.querySelector('#service-title').textContent=service[0];document.querySelector('#service-description').textContent=service[1];const list=document.querySelector('#service-questions');list.replaceChildren();service[2].forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});dialog.showModal();
 }));
 dialog.querySelectorAll('.dialog-close,.dialog-done').forEach(button=>button.addEventListener('click',()=>dialog.close()));dialog.addEventListener('close',()=>previousFocus?.focus());
 dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
}
const packing=document.querySelectorAll('.packing-list input');
function updatePacking(){const count=[...packing].filter(input=>input.checked).length;const label=document.querySelector('#packing-count');if(label)label.textContent=`${count} de ${packing.length} preparados`;}
packing.forEach(input=>input.addEventListener('change',updatePacking));updatePacking();const printButton=document.querySelector('#print-guide');if(printButton)printButton.addEventListener('click',()=>window.print());