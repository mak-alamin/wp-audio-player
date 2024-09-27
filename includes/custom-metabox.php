<?php

add_action('add_meta_boxes', 'mp3_player_add_custom_box');

function mp3_player_add_custom_box()
{
    add_meta_box(
        'mp3_file_sectionid',
        __('Audio File', 'shiny-audio-player'),
        'nml_audio_file_custom_box',
        'musics'
    );
}

function update_edit_form()
{
    echo ' enctype="multipart/form-data"';
}
add_action('post_edit_form_tag', 'update_edit_form');

function nml_audio_file_custom_box()
{

    $audio_file = get_post_meta(get_the_ID(), 'audio_file', true);

    ?>
        Upload Audio File<br>
        <!-- <input type="file" name="audio_file" value="<?php //echo esc_attr($audio_file); ?>" id="audio_file" class="widfat custom-file-input"> <br><br> -->

        <a href="#" class="your-upload-button button-primary">Upload Audio</a>
        <input type="text" name="audio_file" value="<?php echo esc_attr($audio_file); ?>" placeholder="Or paste a url" id="audio_file">
<?php
}

add_action('save_post', 'nml_save_audio_file');
function nml_save_audio_file($post_id)
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('manage_options', $post_id)) {
        return;
    }

    if (isset($_POST['audio_file'])) {
        update_post_meta($post_id, 'audio_file', $_POST['audio_file']);
    }

    // $supported_types = array('audio/wav', 'audio/mp3', 'audio/ogg', 'audio/mpeg');

    // if (isset($_FILES['audio_file'])) {

    //     if (in_array($_FILES['audio_file']['type'], $supported_types)) {
    //         $upload = wp_upload_bits($_FILES['audio_file']['name'], null, file_get_contents($_FILES['audio_file']['tmp_name']));

    //         if (isset($upload['error']) && $upload['error'] != 0) {
    //             wp_die('There was an error uploading your file. The error is: ' . $upload['error']);
    //         } else {
    //             update_post_meta($post_id, 'audio_file', $upload['url']);
    //         }
    //     } else {
    //         wp_die('Unsupported file type!');
    //     }
    // }
}