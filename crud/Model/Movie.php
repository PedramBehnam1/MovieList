<?php

namespace Model;

class Movie{

 /** @var int $id */
 private int $id;

/** @var string $name */
private string $name;

/** @var string $yearOfMaking */
private string $yearOfMaking;

/** @var string $addressFile */
private string $addressFile;

/** @var string $alt */
private string $alt;

/** @var string $description */
private string $description;


 /**
  * @return int
  */
 public function getId(): int
 {
  return $this->id;
 }

 /**
  * @param int $id
  */
 public function setId(int $id): void
 {
  $this->id = $id;
 }


 /**
 * @return string
 */
 public function getName(): string
 {
  return $this->name;
 }

 /**
  * @param int $string
  */
 public function setName(string $name): void
 {
  $this->name = $name;
 }



 /**
 * @return string
 */
 public function getYearOfMaking(): string
 {
  return $this->yearOfMaking;
 }

 /**
  * @param string $yearOfMaking
  */
 public function setYearOfMaking(string $yearOfMaking): void
 {
  $this->yearOfMaking = $yearOfMaking;
 }


 /**
 * @return string
 */
 public function getAddressFile(): string
 {
  return $this->addressFile;
 }

 /**
 * @param string $AddressFile
 */
 public function setAddressFile(string $addressFile): void
 {
  $this->addressFile = $addressFile;
 }


 /**
 * @return string
 */
public function getAlt(): string
{
 return $this->alt;
}

/**
* @param string $alt
*/
public function setAlt(string $alt): void
{
 $this->alt = $alt;
} 



 /**
 * @return string
 */
 public function getDescription(): string
 {
  return $this->description;
 }

 /**
 * @param string $description
 */
 public function setDescription(string $description): void
 {
  $this->description = $description;
 } 
}

?>