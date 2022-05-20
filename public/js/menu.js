$(document).ready(function() {
    $('.borgar').on('click', function() {
        $('.cabecera').toggleClass('hidden');
        $(this).toggleClass('bg2');
    });
});