<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="mp3-player-area">
    <div class="mp3-playlist">
        <div class="titles"></div>
    </div>

    <div class="mp3-player-box">
        <div class="jp-progress">
            <div class="jp-seek-bar"></div>
        </div>
        <div class="mp3-player-box-inner">
            <div class="mp3-player">
                <ul class="jp-controls">
                    <li><span class="sound_control"></span></li>
                    <li><span class="jp-previous"></span></li>
                    <li id="play_pause_btn">
                        <span class="jp-pause"></span><span class="jp-play"></span>
                    </li>
                    <li><span class="jp-next"></span></li>

                    <li><span class="jp-stop"></span></li>

                    <li>
                        <span class="jp-mute" title="mute"></span><span class="jp-unmute" title="unmute"></span>
                    </li>
                    <li class="jp-volume-bar">
                        <span class="jp-volume-bar-value"></span>
                    </li>
                    <li><span class="jp-volume-max" title="max volume"></span></li>

                    <li>
                        <span class="jp-repeat" title="repeat"></span>
                        <span class="jp-repeat-off" title="repeat off"></span>
                    </li>

                    <li>
                        <span class="jp-shuffle" title="shuffle"></span>
                        <span class="jp-shuffle-off" title="shuffle off"></span>
                    </li>

                    <li class="jp-time-holder">
                        <span class="jp-current-time">00:00</span>
                    </li>
                </ul>
            </div>
            <div class="copyright">
                <small>&copy; ShinyCoders | All right reserved.</small>
            </div>
        </div>
    </div>
</div>