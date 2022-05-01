<?php
namespace Controller;

use Exception;
include ('Model/Actions.php');
use Model\Actions;

include('Helper/MovieHelper.php');
use Helper\MovieHelper;

include('Model/Movie.php');
use Model\Movie as movie;
class MovieController{
 public function switcher($method,$request, $connection){
  
  switch ($method) {
   case Actions::CREATE:
    $this->createAction($request, $connection);
    break;
   case Actions::UPDATE:
    $this->updateAction($request, $connection);
    break;
   case Actions::READ:
    if (isset($_GET["id"])) {
     $this->readActionByID($connection);
    }elseif (isset($_GET["nameOfMovie"])) {
     $this->readActionByName($request,$connection);
    }elseif(isset($_GET["yearOfMovie"])){
      $this->readActionByYear($request,$connection);
    }else {
     $this->readAllAction($connection);
    }
    break;
   case Actions::DELETE://dakhel in miad - are 
      echo"sdddddddddddddddddddddddddddddddddddddddddddssssssssssssssssssssssssssss";
     $this->deleteAction($request, $connection);
     break;
   
   default:
    break;
  }
 
 }

 public function createAction($request ,$connection)
 {
  $helper = new MovieHelper();
  $movie = new movie();
  $movie->setName($request['name']);
  $movie->setYearOfMaking($request["year"]);
  $movie->setAddressFile($request["image_url"]);
  echo $request["image_url"];
  $movie->setAlt($request["alt"]);
  $movie->setDescription($request["desc"]);
  
  try {
    $helper->insert($movie ,"movielist",$connection);
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }

 public function updateAction($request,$connection)
 {
  $helper = new MovieHelper();
  $movie = new movie();

  $movie->setId($_GET["id"]);

  $mov = json_decode(file_get_contents('php://input'));
  print_r($mov);
 
  $movie->setName($mov->name);
  $movie->setYearOfMaking($mov->year);
  $movie->setAddressFile($mov->imageUrl);
  $movie->setAlt($mov->alt);
  $movie->setDescription($mov->desc);
  try {
   $helper->update($movie ,"movielist",$connection );
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }

 public function readActionByID($connection)
 {
  $helper = new MovieHelper();
  $movie = new movie();

  $movie->setId($_GET["id"]);
  try {
   $helper->fetchByID($movie->getId() ,"movielist",$connection );
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }

 public function readActionByYear($request,$connection){
  $helper = new MovieHelper();
  $movie = new movie();
  $movie->setYearOfMaking($request["year"]);
  
  try {
   $helper->fetchByYear($movie ,"movielist",$connection );
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }

 public function readActionByName($request ,$connection)
 {
  $helper = new MovieHelper();
  $movie = new movie();
  $movie->setName($request["name"]);
  try {
   $helper->fetchByName($movie ,"movielist",$connection );
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }


 public function readAllAction($connection)
 {
  $helper = new MovieHelper();
  try {
   $helper->fetchAll("movielist",$connection);
  } catch (Exception $e) {
   echo $e->getMessage();
  }
 }

 public function deleteAction($request,$connection)
 {
  $helper = new MovieHelper();
  $movie = new movie();
  try {
  $movie->setId($_GET["id"]);
  $helper->delete($movie,"movielist",$connection);
  } catch (Exception $e) {
   echo $e->getMessage();
  }

 }
}