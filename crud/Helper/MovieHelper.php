<?php

namespace Helper;

use Exception;

class MovieHelper{

 public function insert($movie , $tableName,$connection){
  $name = $movie->getName();
  $yearOfMaking = $movie->getYearOfMaking();
  $addressFile = $movie->getAddressFile();
  $alt = $movie->getAlt();
  $description = $movie->getDescription();

  $query = "INSERT INTO $tableName(name , yearOfMaking , addressFile , description , alt) VALUES ('$name','$yearOfMaking' ,'$addressFile' , '$description' , '$alt') ";
  
  
  $result = $connection->query($query);
  if ( $result=== TRUE) {
   echo json_encode($result);
  } else {
   throw new Exception("Error: " . $query . "<br>" . $result->error);
  }
  $connection->close();
 }

 public function fetchAll($tableName , $connection):void{
  
  $query = "SELECT id,name,yearOfMaking,addressFile,alt FROM $tableName";
  
  $result = $connection->query($query);
  
  if($result->num_rows > 0){
   echo"[";
   for ($i=0; $i < $result->num_rows ; $i++) { 
    echo ($i>0 ? ',':'').json_encode($result->fetch_assoc());
   }
   echo"]";
  }else{
   throw new Exception("rows: 0");
  }
  $connection->close();
 }

 public function fetchByID(int $id,$tableName,$connection ):void
 {
  $query = "SELECT * FROM $tableName WHERE id = $id";
  $result = $connection->query($query);
  if ($result->num_rows > 0) {
   for ($i=0; $i < $result->num_rows ; $i++) { 
    echo ($i>0 ? ',':'').json_encode($result->fetch_assoc());
   }
  }else{
   throw new Exception("rows: 0");
  }
  $connection->close();
 }


 public function fetchByName($movie,$tableName,$connection ):void{
  $name = $movie->getName();
  $query = "SELECT id,name,addressFile,yearOfMaking FROM $tableName WHERE name='$name'";

  $result = $connection->query($query);
  if ($result->num_rows > 0) {
   echo "[";
   for ($i=0; $i < $result->num_rows ; $i++) { 
    echo ($i>0 ? ',':'').json_encode($result->fetch_assoc());
   }
   echo "]";
  }else{
   throw new Exception("rows: 0");
  }
  $connection->close();
 }


 public function fetchByYear($movie,$tableName,$connection ):void{
  $yearOfMaking = $movie->getYearOfMaking();
  
  $query = "SELECT id,name,addressFile,yearOfMaking FROM $tableName WHERE yearOfMaking='$yearOfMaking'";

  $result = $connection->query($query);
  if ($result->num_rows > 0) {
   echo "[";
   for ($i=0; $i < $result->num_rows ; $i++) { 
    echo ($i>0 ? ',':'').json_encode($result->fetch_assoc());
   }
   echo "]";
  }else{
   throw new Exception("rows: 0");
  }
  $connection->close();
 }
 // public function fetchByNameOrYear($movie,$tableName,$connection ):void{

 //  $name = $movie->getName();
 //  $yearOfMaking = $movie->getYearOfMaking();
 //  echo $name;
 //  if($name != ""){
 //   echo "dddddddddddddddddddddddd12121";
 //   $query = "SELECT name,addressFile,yearOfMaking FROM $tableName WHERE name='$name'";
 //  }elseif($yearOfMaking != "") {
 //   echo "dddddddddddddddddddddddd";
 //   $query = "SELECT name,addressFile,yearOfMaking FROM $tableName WHERE yearOfMaking='$yearOfMaking'";
 //  }
  
 //  $result = $connection->query($query);
 //  if ($result->num_rows > 0) {
 //   echo "[";
 //   for ($i=0; $i < $result->num_rows ; $i++) { 
 //    echo ($i>0 ? ',':'').json_encode($result->fetch_assoc());
 //   }
 //   echo "]";
 //  }else{
 //   throw new Exception("rows: 0");
 //  }
 //  $connection->close();
 // }

 public function update($movie,$tableName,$connection):void
 {
  $name=$movie->getName();
  $yearOfMaking = $movie->getYearOfMaking();
  $addressFile = $movie->getAddressFile();
  $description = $movie->getDescription();
  $alt = $movie->getAlt();
  $id = $movie->getId(); // moshkel injast

  $query = "UPDATE $tableName SET name='$name',yearOfMaking='$yearOfMaking' ,addressFile='$addressFile' , description='$description' , alt='$alt' WHERE id=$id";
  $result = $connection->query($query);
  echo "<br />";
  if ( $result) {
   echo "New record created successfully";
   echo json_encode($result);
  } else {
   throw new Exception("Error: " . $query . "<br>" . $result->error);
  }
  $connection->close();
 }

 public function delete($movie,$tableName,$connection):void
 {
  $id = $movie->getId();

  $query = "DELETE FROM $tableName WHERE id= $id";
  $result = $connection->query($query);
  echo "<br />";
  if ( $result) {
   echo "one record deleted successfully";
   echo json_encode($result);
  } else {
   throw new Exception("Error: " . $query . "<br>" . $result->error);
  }
  $connection->close();
 }

}