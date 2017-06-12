'use strict';

const Node = function(va, next=null, prev=null){
  this.val = val;
  this.next = next;
  this.prev = prev;
};

const DLL = module.exports = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

DLL.prototype.append = function(val){
  if(!val) throw new Error('Please provide a value');
  if(!this.head) return this.head = this.tail = new Node(val);

  this.head.next = new Node(val);
  this.head.next.prev = this.head;
  this.head = this.head.next;
  this.length++;
  return this.head;
};

DLL.prototype.prepend = function(val) {
  if(!val)throw new Error('Must Provide A Value');
  if(!this.tail) return this.tail = this.head = new Node(val);

  this.tail.prev = new Node(val);
  this.tail.prev.next = this.tail;
  this.tail = this.tail.prev;
  this.length++;
  return this.tail;
};

DLL.prototype.remove = function(val){
  if(!val) throw new Error('Must Provide Value');
  if(!this.tail) throw new Error('The List Is Empty');

  let current = this.head;
  while(current) {
    if(current.val === val){
      if(current === this.head && current === this.tail){
        this.head = null;
        this.tail = null;
      } else if(current === this.head){
        this.head = this.head.next;
        this.head.prev = null;
      } else if(current === this.tail){
        this.tail =this.tail.prev;
        this.tail.next = null;
      } else {
        ccurrent.prev.next = current.next;
        current.next.prev = current.prev;
      }
      this.length--;
    }
    current = current.next;
  }
};
