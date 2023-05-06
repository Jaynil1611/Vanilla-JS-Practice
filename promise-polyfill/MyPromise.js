// TODO: Add validations in each promise method for accepting any argument

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
    if (this.isResolved) {
      this.resolvedChain.reduce((res, func) => func(res), this.resolvedData);
    }
    return this;
  }

  catch(errorCallback) {
    this.rejectedChain.push(errorCallback);
    if (this.isRejected) {
      this.rejectedChain.forEach((func) => func(this.rejectedError));
    }
    return this;
  }

  finally(callback) {
    this.resolvedChain.push(callback);
    this.rejectedChain.push(callback);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(error) {
    return new MyPromise((_, reject) => reject(error));
  }

  static all(promises) {
    const fulfilled = [];
    let promiseCount = 0;

    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
      }
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            fulfilled[index] = value;
            promiseCount++;
            if (promiseCount === promises.length) {
              resolve(fulfilled);
            }
          })
          .catch((error) => reject(error));
      });
    });
  }

  static any(promises) {
    const rejected = [];
    let promiseCount = 0;

    return new MyPromise((resolve, reject) => {
      if (promises.length === 0) {
        reject([]);
      }
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            resolve(value);
          })
          .catch((error) => {
            rejected[index] = error;
            promiseCount++;

            if (promiseCount === promises.length) {
              reject(rejected);
            }
          });
      });
    });
  }
}

const p1 = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("All cool");
    // rej("errrrr");
  }, 1000);
});

const p2 = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej("All cool P2!");
    // rej("errrrr");
  }, 800);
});

// const p1 = MyPromise.resolve("All cool!");
// const p2 = MyPromise.reject("All cool P2!");

// const result = MyPromise.all([p1, p2]);
// result.then((res) => console.log(res)).catch((err) => console.log(err));

const result = MyPromise.any([p1, p2]);
result
  .then((res) => console.log(res))
  .catch((err) => {
    console.error("error");
    console.error(err);
  });

// p1.then((res) => {
//   console.log(res);
//   return res;
// })
//   .then((res) => console.log(`${res} bro!`))
//   .catch((err) => console.error(err))
//   .finally(() => console.log("final call"));
