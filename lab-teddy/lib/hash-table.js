'use strict';

const DLL = require('./dll.js');

const HashTable = module.exports = function(size=8192){
  this.size = size;
  this.bucket = [...Array(this.size)].fill(new DLL());
};

HashTable.prototype.hashKey = function(key){
  if(!key) throw new Error('Key is needed for hash Table');
  let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size;
  return hash;
};

HashTable.prototype.set = function(key, value){
  this.bucket[this.hashKey(key)] = value;
};

HashTable.prototype.get = function(key){
  return this.bucket[this.hashKey(key)];
};

HashTable.prototype.remove = function(key){
  let address = this.hashKey(key);
  this.bucket [address] ? delete  this.bucket[address] : new Error('Invalid key');
};
