<?php

include('Helper/DBConnector.php');
use Helper\DBConnector as DB;

include ('Controller/MovieController.php');
use Controller\MovieController as controller;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST,OPTIONS,PUT,DELETE");
// header("Access-Control-Allow-credentials: true");
header("Access-Control-Max-Age:86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization ,X-Requested-With"); // khob ina okeye - ye jori in request ro block mikone - mikhay code haye php ham bendaz to file haye react - ye pooshe besez be esm api ya server -farghi nadare inja nashe - oonja ham nemishe - yeki oomade cors ro nasb karde ba npm badesh pas dade be request axios


$host = "localhost";
$username = "Pedram";
$password = "Pedram.Behnam1";
$db = "movie";

$conection = new DB($host, $username, $password, $db);

$conection->connect();

$method = $_SERVER['REQUEST_METHOD'];
$request = $_REQUEST;
$controller = new controller();
$controller->switcher($method,$request,$conection->getMysqli());
