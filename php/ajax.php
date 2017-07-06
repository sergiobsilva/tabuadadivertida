<?php

/***************************************************************************************
 * Include all configs
 **************************************************************************************/
include_once('config.php');

/***************************************************************************************
 * Process
 **************************************************************************************/
if( isset( $_POST['type'] ) && 'twitter' == $_POST['type'] ) {

    include_once('api/TwitterAPIExchange.php'); // Twitter API

    $tw_settings = array(
        'oauth_access_token'        => TW_OAUTH_ACCESS_TOKEN,
        'oauth_access_token_secret' => TW_OAUTH_ACCESS_TOKEN_SECRET,
        'consumer_key'              => TW_CONSUMER_KEY,
        'consumer_secret'           => TW_CONSUMER_SECRET
    );

    $cache = @file_get_contents( TW_CACHE_FILENAME, "r");

    if( $cache && !empty($cache)
        && ($exp_time = substr($cache, 0, strpos($cache, '|')))
        && (time() - $exp_time) <  CACHE_ALIVE ) {

        echo json_encode(array(
            'status'        => 'success',
            'html'          => substr($cache, strpos($cache, '|') + 1),
            'from_cache'    => true
        ));
        exit();

    } else {

        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?screen_name=' . TW_TWITTER_UNAME . '&count=' . TW_COUNT_TWITTS;
        $requestMethod = 'GET';

        $twitter = new TwitterAPIExchange($tw_settings);
        $response = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest( true, array( CURLOPT_SSL_VERIFYPEER => false ) );
        $response = json_decode( $response );

        $return_html = '';
        if( is_object($response) && isset( $response->errors ) ) {

            echo json_encode(array(
                'status'        => 'fail',
                'api_errors'    => $response->errors
            ));
            exit();

        } elseif( is_array($response) ) {

            $return_html .= '<ul class="twitter-timeline">';
            foreach( $response as $item ) {
                $return_html .= '<li><p><span class="tw-author"><a href="https://twitter.com/' . $item->user->screen_name . '" target="_blank">@' . $item->user->screen_name . '</a></span>' . $item->text . '</p></li>';
            }
            $return_html .= '</ul>';

            @file_put_contents(TW_CACHE_FILENAME, time() . '|' . $return_html);

            echo json_encode(array(
                'status'    => 'success',
                'html'      => $return_html
            ));
            exit();

        }

    }

} elseif( isset( $_POST['type'] ) && 'instagram' == $_POST['type'] ) {

    include_once('api/Instagram.php'); // Instagram API

    $instagram = new Instagram(array(
        'apiKey'      => INST_API_KEY,
        'apiSecret'   => INST_API_SECRET
    ));

    $cache = @file_get_contents( INST_CACHE_FILENAME, "r");

    if( $cache && !empty($cache)
        && ($exp_time = substr($cache, 0, strpos($cache, '|')))
        && (time() - $exp_time) <  CACHE_ALIVE ) {

        echo json_encode(array(
            'status'        => 'success',
            'html'          => substr($cache, strpos($cache, '|') + 1),
            'from_cache'    => true
        ));
        exit();

    } else {

        $response = $instagram->getUserMedia(INST_USER_ID, INST_COUNT);

        if( is_object( $response ) && isset( $response->meta->error_type ) ) {

            echo json_encode(array(
                'status'        => 'fail',
                'api_errors'    => $response->meta->error_message
            ));
            exit();

        } elseif( is_object( $response ) && isset( $response->data ) ) {

            $return_html = '<ul class="instagram-timeline">';
            foreach( (array) $response->data as $img_info )  {
                $return_html .= '<li><a href="' . $img_info->link . '" target="_blank"><img src="' . $img_info->images->thumbnail->url . '"></a></li>';
            }
            $return_html .= '</ul>';

            @file_put_contents(INST_CACHE_FILENAME, time() . '|' . $return_html);

            echo json_encode(array(
                'status'    => 'success',
                'html'      => $return_html
            ));
            exit();
        }

    }

}