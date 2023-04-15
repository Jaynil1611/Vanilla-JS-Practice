export class MyPromise {
  constructor(resolver) {
    this.resolvedData = null;
    this.rejectedError = null;
    this.isResolved = false;
    this.isRejected = false;
    this.resolvedChain = [];
    this.rejectedChain = [];

    resolver(this.resolve, this.reject);
  }

  resolve(value) {
    if (value) this.resolvedData = value;
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
