<?php

namespace Helper;

use Exception;
use mysqli;




class DBConnector{


/**
 * Static instance of self
 *
 * @var MysqliDb
 */
protected static $_instance;





/**
* MySQLi instance
*
* @var mysqli
*/
protected $mysqli = null;


/** @var mixed $db */
private $db;
private $host;
private $username;
private $password;


 public function __construct($host,$username,$password,$db)
 {
  $this->host = $host;
  $this->username = $username;
  $this->password = $password;
  $this->db = $db;
 }

 /**
 * @throws \Exception
 * @return void
 */
 public function connect():void{
  try {
   $this->mysqli = new mysqli($this->host, $this->username, $this->password, $this->db);

    if (!$this->mysqli) {
     throw new Exception("There was a problem connecting to the database");
   }else {
     $this->mysqli->set_charset('utf8');
     self::$_instance = $this;
   }

  } catch (Exception $e) {
   echo "fetal error".$e->getMessage();
  }
 }


 /**
 * @param string $query
 * @return object
 */

 public function getMysqli():object {
  return $this->mysqli;
 }


}

