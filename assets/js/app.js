; (function ($) {
    $(document).ready(function () {
        const play_btn = $('ul.jp-controls li#play_pause_btn span.jp-play');
        const pause_btn = $('ul.jp-controls li#play_pause_btn span.jp-pause');
        const stop_btn = $('ul.jp-controls li span.jp-stop');

        const mute_btn = $('ul.jp-controls li span.jp-mute');
        const unmute_btn = $('ul.jp-controls li span.jp-unmute');

        const playlist_toggle = $('.sound_control');

        const progressBar = $('.jp-seek-bar');
        const liveTimeBox = $('.jp-current-time');
        const volumeValue = $('.jp-volume-bar-value');

        const songs = song_arr_object.song_arr;

        $.each(songs, function (index, value) {
            let title = value.split('?')[1].split('=')[1];

            $('.mp3-playlist .titles').append('<p>' + title + '</p>');
        });

        var playlist_titles = $('.mp3-playlist .titles p');

        const playlist_height = $('.mp3-playlist').height();


        let currentTrack = 0;
        let currentVolume = 0.74;
        let repeat = false;
        let isShuffle = false;


        // Playlist toggle
        playlist_toggle.on('click', function () {
            $('.mp3-playlist').css('height', playlist_height + 15);
            $('.mp3-playlist').animate({
                height: 'toggle'
            }, 1000);
        });


        // Cnvert Time to Minutes and Seconds
        let convertTime = function (time) {
            var mins = Math.floor(time / 60);
            if (mins < 10) {
                mins = '0' + String(mins);
            }
            var secs = Math.floor(time % 60);
            if (secs < 10) {
                secs = '0' + String(secs);
            }
            return mins + ':' + secs;
        }

        // Shuffle array
        let shuffle = function (arr) {
            let array = [...arr];
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        const audio = new Audio();

        console.log(songs);
        
        // Play first time on poge load
        audio.src = songs[currentTrack];
        audio.currentTime = 0;
        audio.autoplay = true;
        playlist_titles.first().addClass('active');

        $(audio).on("play", function () {
            pause_btn.css('display', 'inline-bock');
            play_btn.css('display', 'none');
        });

        $(audio).on('ended', function () {
            currentTrack++;
            return playSong(currentTrack);
        });

        // Time Update function
        let updateTime = function (duration, currentTime) {
            let percentage = (currentTime / duration) * 100;

            progressBar.css('width', percentage + '%');

            liveTimeBox.text(convertTime(currentTime));
        }

        let Mute = function () {
            audio.volume = 0;
            mute_btn.css('display', 'none');
            unmute_btn.css('display', 'inline-block');
            volumeValue.css('width', 1 + '%');
        }

        let unMute = function () {
            audio.volume = currentVolume;
            unmute_btn.css('display', 'none');
            mute_btn.css('display', 'inline-block');
            volumeValue.css('width', currentVolume * 100 + '%');
        }

        // Volume Control Function
        let volumeControl = function (e) {
            const width = $(this).width();
            const clickX = e.offsetX;

            if (clickX <= 2) {
                Mute();
                return;
            }

            currentVolume = (clickX / width);

            unMute();
        }


        // Play song function
        let playSong = function (currentTrack) {
            console.log('Current: ' + currentTrack);
            // console.log(songs);

            audio.src = songs[currentTrack];
            audio.currentTime = 0;
            audio.play();

            if (audio.paused) {
                pause_btn.css('display', 'none');
                play_btn.css('display', 'inline-block');
            }

            $(playlist_titles[currentTrack]).addClass('active').siblings().removeClass('active');

            $(audio).on('ended', function () {
                currentTrack++;

                if (isShuffle) {
                    let shuffled_songs = shuffle(songs);
                    $('.mp3-playlist .titles').empty();
                    $.each(shuffled_songs, function (index, value) {
                        let title = value.split('?')[1].split('=')[1];

                        $('.mp3-playlist .titles').append('<p>' + title + '</p>');
                    });

                    playlist_titles = $('.mp3-playlist .titles p');
                }

                if (!isShuffle) {
                    $('.mp3-playlist .titles').empty();
                    $.each(songs, function (index, value) {
                        let title = value.split('?')[1].split('=')[1];

                        $('.mp3-playlist .titles').append('<p>' + title + '</p>');
                    });
                    playlist_titles = $('.mp3-playlist .titles p');
                }



                if (currentTrack === songs.length && repeat) {
                    currentTrack = 0;
                    return playSong(currentTrack);

                } else if (currentTrack === songs.length && !repeat) {
                    currentTrack--;
                    audio.currentTime = 0;
                    audio.pause();
                    progressBar.css('width', 0);
                    $(playlist_titles[currentTrack]).addClass('active');

                    playlist_titles.each(function (i, title) {
                        $(title).on('click', function () {
                            audio.pause();

                            $.each(songs, function (index, value) {
                                let songarr_title = value.split('?')[1].split('=')[1];
                                if (songarr_title === $(title).text()) {
                                    currentTrack = index;
                                }
                            });

                            playSong(currentTrack);
                        });
                    });

                    return;
                } else {
                    return playSong(currentTrack);
                }
            });
        }


        // Update Time
        $(audio).on('timeupdate', function () {
            updateTime(audio.duration, audio.currentTime);
        });


        // Play Each Track on click
        playlist_titles.each(function (i, title) {
            $(title).on('click', function () {
                audio.pause();

                $.each(songs, function (index, value) {
                    let songarr_title = value.split('?')[1].split('=')[1];
                    if (songarr_title === $(title).text()) {
                        currentTrack = index;
                    }
                });

                playSong(currentTrack);
            });
        });


        // Set Progress Bar on click and update time
        $('.jp-progress').on('click', function (e) {
            const width = $(this).width();
            const clickX = e.offsetX;

            let duration = audio.duration;

            const newTime = (clickX / width) * duration;

            let percentage = (newTime / duration) * 100;

            audio.currentTime = newTime;

            progressBar.css('width', percentage + '%');

            liveTimeBox.text(convertTime(newTime));
        });


        // Pause button functionality
        pause_btn.on('click', function () {
            pause_btn.css('display', 'none');
            play_btn.css('display', 'inline-block');
            audio.pause();
        });

        // Play button functionality
        play_btn.on('click', function () {
            play_btn.css('display', 'none');
            pause_btn.css('display', 'inline-block');
            audio.play();
        });

        // Next button functionality
        $('ul.jp-controls li span.jp-next').on('click', function () {
            if (currentTrack === songs.length - 1 && repeat) {
                currentTrack = 0;
                playlist_titles.first().trigger('click');
            } else {
                $('.active').next().trigger('click');
            }
            play_btn.css('display', 'none');
            pause_btn.css('display', 'inline-block');
        });

        // Previous button functionality
        $('ul.jp-controls li span.jp-previous').on('click', function () {
            $('.active').prev().trigger('click');
            play_btn.css('display', 'none');
            pause_btn.css('display', 'inline-block');
        });

        // Stop button functionality
        stop_btn.on('click', function () {
            audio.pause();
            audio.currentTime = 0;
            pause_btn.css('display', 'none');
            play_btn.css('display', 'inline-block');
        });

        // Mute button functionality
        mute_btn.on('click', Mute);

        // Unmute button functionality
        unmute_btn.on('click', unMute);

        // Max Volume button functionality
        $('ul.jp-controls li span.jp-volume-max').on('click', function () {
            currentVolume = 1;
            unMute();
        });

        // Increase Decrease Volume on click
        $('.jp-volume-bar').on('click', volumeControl);


        // Repeat music on click
        $('.jp-repeat').on('click', function () {
            repeat = true;

            $(this).css('display', 'none');
            $('.jp-repeat-off').css('display', 'inline-block');
        });

        // Repeat Off music on click
        $('.jp-repeat-off').on('click', function () {
            repeat = false;
            $(this).css('display', 'none');
            $('.jp-repeat').css('display', 'inline-block');
        });


        // Shuffle music on click
        $('.jp-shuffle').on('click', function () {
            isShuffle = true;
            $(this).css('display', 'none');
            $('.jp-shuffle-off').css('display', 'inline-block');
        });


        // Shuffle Off music on click
        $('.jp-shuffle-off').on('click', function () {
            isShuffle = false;
            $(this).css('display', 'none');
            $('.jp-shuffle').css('display', 'inline-block');
        });

    });
})(jQuery);