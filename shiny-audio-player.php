<?php

/**
 * Plugin Name: Shiny Audio Player
 * Plugin URI:
 * Description: Dynamic MP3 Player with music uploading option
 * Version: 1.0.0
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * Author: Mak Alamin
 * Author URI:
 * License: GPL v2 or later
 * License URI: https: //www.gnu.org/licenses/gpl-2.0.html
 * Update URI:
 * Text Domain: shiny-audio-player
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'includes/music-post-type.php';
require_once plugin_dir_path(__FILE__) . 'includes/custom-metabox.php';

// Load Frontend Scripts
function nml_mp3_player_scripts()
{
    wp_enqueue_style('shiny-audio-player-style', plugins_url('/assets/css/style.css', __FILE__));

    wp_enqueue_script('shiny-audio-player-fontawesome', 'https://use.fontawesome.com/c98d81fab7.js', array(''), '1.0.0', true);

    wp_enqueue_script('shiny-audio-player-script', plugins_url('/assets/js/app.js', __FILE__), array('jquery'), '1.0.0', true);

    wp_localize_script('shiny-audio-player-script', 'song_arr_object', array(
        'song_arr' => nml_create_music_array_with_query(),
    ));
}
add_action('wp_enqueue_scripts', 'nml_mp3_player_scripts');

// Load Admin Scripts
function nml_load_admin_scripts()
{
    wp_enqueue_script('media-upload');
    wp_enqueue_media();
    wp_enqueue_script('wp-media-uploader', plugins_url('assets/js/media_uploader.js', __FILE__), array('jquery'), '1.0.0', true);
}
add_action('admin_enqueue_scripts', 'nml_load_admin_scripts');

// Header Scripts
function nml_mp3_player_head_script()
{
    echo '<script src="https://use.fontawesome.com/c98d81fab7.js"></script>';
}
add_action('wp_head', 'nml_mp3_player_head_script');

// Footer HTML
function nml_mp3_player_add_html()
{
    if (!is_admin()) {
        require_once plugin_dir_path(__FILE__) . '/views/mp3-html.php';

    }
}
add_action('wp_footer', 'nml_mp3_player_add_html');

add_action('init', 'nml_create_music_array_with_query');
function nml_create_music_array_with_query()
{
    $args = [
        'post_type' => 'musics',
    ];
    $musics = new WP_Query($args);

    $audios = $musics->get_posts();

    $song_arr = [];

    foreach ($audios as $key => $audio) {
        $audio_file = get_post_meta($audio->ID, 'audio_file', true);
        $title = $audio->post_title;

        $song_arr[] = $audio_file . '?title=' . $title;
    }

    return $song_arr;
}
