<?php
/* Author: Ethan Joachim Eldridge
 * Complaints about goto and using mysql_* can go to my spam box.
 * Data Retrieval Of Useful statistics for green up. 
*/
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Cache-Control: public,max-age=86400");
$lastMod = gmdate('D, d M Y H:i:s \G\M\T', filemtime(__FILE__));
$eTag = md5("$lastMod" . __FILE__ );
$ifmod = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] == $lastMod : null; 
$iftag = isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] == $eTag : null; 
$iSecondsToCache = 60*60*24;
if (($ifmod || $iftag) && ($ifmod !== false && $iftag !== false)) { 
    header('HTTP/1.0 304 Not Modified'); 
    //header('Expires: ' . gmdate('D, d M Y H:i:s', filemtime(__FILE__) + $iSecondsToCache) . ' GMT');
    exit();
} else {
    header("Last-Modified: $lastMod"); 
    header("ETag: $eTag");
    //header('Expires: ' . gmdate('D, d M Y H:i:s', filemtime(__FILE__) + $iSecondsToCache) . ' GMT');
}
ini_set("memory_limit", "198M"); //this script is allowed to do a lot of work
$conf = json_decode(file_get_contents("/etc/conf/local.conf"), 1);
define("DB_USER", $conf["mysql-user"]);
define("DB_HOST", $conf["host"]);
define("HOST", $conf["host"]);
define("DB_PASS", $conf["mysql-password"]);
define("DB_NAME", $conf["db-name"]);


/* Yes I know mysql_* is deprecated, but its easy, quick, and follows the C API. 
 * Plus we're not really worried about sanitization considering there is no user
 * input.
*/
$link = mysql_connect(DB_HOST, DB_USER, DB_PASS);
$code = 200;
$data = array();
$message = "Data not available";
if(!$link){
        $code = 500;
        goto send;
}
if( ! mysql_select_db(DB_NAME, $link) ){
        $code = 503;
        mysql_close($link);
        goto send;
}

$heatmapJS = array();
$heatmapLapse = array();
$heatmapResource = mysql_unbuffered_query("SELECT intensity as timeworked, DATE_FORMAT(created_time, '%H') as created_time, latitude, longitude FROM heatmap ORDER BY created_time ASC",$link);

while ($row = mysql_fetch_object($heatmapResource)) {
	/* Convert it into structures for heatmap and timelapse */
	$heatmapJS[] = array(floatval($row->latitude), floatval($row->longitude), intval($row->timeworked));
	for ($i=0; $i <= intval($row->created_time) ; $i++) { 
		$heatmapLapse["$i"][] = array(floatval($row->latitude), floatval($row->longitude), intval($row->timeworked));
	}
}
mysql_free_result($heatmapResource);
mysql_close($link);

$data["heatmapLapse"] = $heatmapLapse;
$data["heatmapJS"] =  $heatmapJS;
$message = "Data retrieved at " . date('Y-M-D h:m:s');



send:
echo json_encode(array("status_code" => $code, "data" => $data, "message" => $message));
exit();

?>