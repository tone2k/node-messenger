$(() => {
    $('#send').click(()=>{
        addMessages({name: 'Tim', message: 'Hello'}) 
    });
});

function addMessages(message){
    $('#messages').append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
}