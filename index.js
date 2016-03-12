$(function() {
    // Thanks to Jason at Stack Overflow
    // http://stackoverflow.com/a/987376
    function SelectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
            ;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    // End of StackOverflow copying

    $.each(emojis, function(key, value) {
        newEmojis = "";
        $.each(value, function(_, emojiToAdd) {
            newEmojis += "<div class='emoji-row col-sm-6' data-code='" + emojiToAdd.code + "'><span class='em " + emojiToAdd.css + "'></span></div>"
        });
        $('#' + key).append(newEmojis);
    });

    $('.emoji-row').click(function() {
        showCopyingScreen($(this).data('code'));
    });

    function showCopyingScreen(codeToCopy) {
        $('#modal').removeClass('hidden');
        $('#hidden-input').text(codeToCopy);
        SelectText('hidden-input');
    }
    function hideCopyingScreen() {
        $('#modal').addClass('animated zoomOut');
        setTimeout(function() {
            $('.overlay-inner > h1').text('Copying emoji').removeClass('animated bounceIn');
            $('#modal').removeClass('animated zoomOut').addClass('hidden');
        }, 1000);

    }
    $('#hidden-input').bind('copy', function() {
        $('.overlay-inner > h1').text('Emoji copied!').addClass('animated bounceIn');
        setTimeout(function() {
            hideCopyingScreen();
        }, 500);
    })
    $('#modal').click(hideCopyingScreen);
});