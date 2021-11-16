<?php

/**
 * Plugin Name: MP3 Player
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
 * Text Domain: nml-mp3-player
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'includes/music-post-type.php';

function nml_mp3_player_scripts()
{
    wp_enqueue_style('nml-mp3-player-style', plugins_url('/assets/css/style.css', __FILE__));

    wp_enqueue_script('nml-mp3-player-fontawesome', 'https://use.fontawesome.com/c98d81fab7.js', array(''), '1.0.0', true);

    wp_enqueue_script('nml-mp3-player-script', plugins_url('/assets/js/app.js', __FILE__), array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'nml_mp3_player_scripts');

function nml_mp3_player_head_script()
{
    echo '<script src="https://use.fontawesome.com/c98d81fab7.js"></script>';
}
add_action('wp_head', 'nml_mp3_player_head_script');

function nml_mp3_player_add_html()
{
    if (!is_admin()) {
        require_once plugin_dir_path(__FILE__) . '/views/mp3-html.php';

    }
}
add_action('wp_footer', 'nml_mp3_player_add_html');
