Swal.fire({
    title: `Cảm ơn bạn đã tham gia`,
    background: 'rgb(115, 149, 198)',
    color: "white"


}).then((result) => {
    if(result.isConfirmed) {
    
        window.location.href = "letter.html"
    }
})