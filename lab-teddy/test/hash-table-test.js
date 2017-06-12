'use strict';

const expect = require('chai').expect;
const faker = require('faker');
const HashTable = require('../lib/hash-table');

describe('Hash Table Module', function(){
  before(done => {
    this.fakeKey = [...Array(100)].map(key => key = faker.hacker.phrase());
    done();
  });
  after(done => {
    delete this.fakeKey;
    done();
  });
  beforeEach(done => {
    this.hashTable = new HashTable();
    done();
  });
  afterEach(done => {
    this.hashTable = null;
    done();
  });
  describe('Instance of New Hash Table', () => {
    it('should instantiate a new empty hash table', done => {
      expect(this.hashTable).to.not.be.null;
      expect(this.hashTable).to.be.instanceOf(Object, HashTable);
      done();
    });
    it('should have a default size of 8192', done => {
      expect(this.hashTable.bucket.length).to.equal(8192);
      done();
    });
    it('should create a new hash table with a specified sized of 1024', done => {
      this.hashTable = new HashTable(1024);
      expect(this.hashTable.bucket.length).to.equal(1024);
      done();
    });
    it('should have a defaulet buckets propery with assigned array', done => {
      expect(this.hashTable.bucket).to.be.instanceOf(Array);
      done();
    });
  });
  describe('Hash a key for the Hash Table', () => {
    it('should hash a key', done => {
      let expectHash = this.hashTable.hashKey('Test');
      let actualHash = 416;
      expect(expectHash).to.equal(actualHash);
      done();
    });
    it('should always hash a key to less than 8192', done => {
      this.fakeKey.forEach(key => {
        expect(this.hashTable.hashKey(key)).to.be.lessThan(8192);
      });
      done();
    });
  });
  describe('Set Value to Hash Table', () => {
    it('should add a new calue to hash table', done => {
      let expectKey = this.hashTable.hashKey('test test');
      this.hashTable.set('test test', 'test valve');
      expect(this.hashTable.bucket[expectKey]).to.equal('test valve');
      done();
    });
  });
  describe('Get Value in Hash Table', () => {
    it('should retrieve a value from the hash table by it\'s key', done => {
      this.hashTable.set('test test', 'test valve');
      let expectVal = 'test valve';
      let actualVal = this.hashTable.get('test test');
      expect(expectVal).to.equal(actualVal);
      done();
    });
  });
  describe('Remove value from Hash Table', () => {
    it('should remove an item from the hash table', done => {
      this.hashTable.set('test test', 'test valve');

      let expectKey = this.hashTable.hashKey('test test');
      let expectVal = 'test test';
      let actualVal = this.hashTable.get('test test');

      this.hashTable.remove('test test');

      expect(this.hashTable.bucket[expectKey]).to.be.undefined;
      done();
    });
  });
});
