$(() => {
    $('#send').click(()=>{
        addMessages({name: 'Tim', message: 'Hello'}) 
    });
    getMessages();
});

function addMessages(message){
    $('#messages').append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
}

function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
        console.log(data)
    })
}