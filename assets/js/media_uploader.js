(function ($) {
    $(document).ready(function () {
        $(document).on("click", ".your-upload-button", function () {

            var button = $(".your-upload-button");

            var tm_wp_media = wp.media({

                title: 'Select Audio',

                library: {
                    type: 'file'
                },

                button: {
                    text: 'Upload Audio'
                },

                multiple: false

            });

            tm_wp_media.open();

            tm_wp_media.on("select", function () {
                var attachment = tm_wp_media.state().get('selection').first().toJSON();

                button.siblings('#audio_file').val(attachment.url);
            });
        });
    })
})(jQuery);