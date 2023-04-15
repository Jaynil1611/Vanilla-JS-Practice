class MyPromise {
  constructor(resolver) {
    this.resolvedData = null;
    this.rejectedError = null;
    this.isResolved = false;
    this.isRejected = false;
    this.resolvedChain = [];
    this.rejectedChain = [];

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    this.catch = this.catch.bind(this);

    resolver(this.resolve, this.reject);
  }

  resolve(value) {
    this.resolvedData = value;
    this.isResolved = true;

    if (this.resolvedChain.length) {
      this.resolvedChain.reduce((res, func) => func(res), this.resolvedData);
    }
  }

  reject(error) {
    this.rejectedError = error;
    this.isRejected = true;

    if (this.rejectedChain.length) {
      this.rejectedChain.forEach((func) => func(error));
    }
  }

  then(successCallback) {
    this.resolvedChain.push(successCallback);
    return this;
  }

  catch(errorCallback) {
    this.rejectedChain.push(errorCallback);
    return this;
  }

  finally(callback) {
    this.resolvedChain.push(callback);
    this.rejectedChain.push(callback);
  }
}

const p1 = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("All cool");
    // rej("errrrr");
  }, 1000);
});

p1.then((res) => {
  console.log(res);
  return res;
})
  .then((res) => console.log(`${res} bro!`))
  .catch((err) => console.error(err))
  .finally(() => console.log("final call"));
