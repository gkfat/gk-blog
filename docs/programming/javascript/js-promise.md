---
layout: doc

title: JavaScript 學習筆記 - Promise

description: JavaScript 是個一條腸子通到底單線程語言，但許多情境下都需要處理非同步的請求，而我們又不確定這個請求什麼時候會得到回應（或者沒有回應）。這時候就會很希望有人可以給我們一個承諾，當諾言實現的時候我們再去處理它，這個承諾就是 Promise。
---

# {{ $frontmatter.title }}

:::info Intro
{{ $frontmatter.description }}
:::

## 基本應用

### 給你一個承諾

最常見的例子，就是過一段時間後才會有結果的一個異步請求。例如：

```js:line-numbers
const promise = new Promise((resolve) => {
    let result = 'foo';

    // 3 秒後回應結果
    setTimeout(() => {
        resolve(result);
    }, 3000);
})

promise.then((res) => {
    console.log(res); // 結果是 'foo'
})
```

### `Promise.all()`

> 情境：你需要向 3 個不同的 api 發出請求，但你需要等 3 個請求都回應了才繼續進行下一步。

這種情況該怎麼做？

這時候可以用 Promise 類的方法 `all()` 來處理。這個方法會等待所有 promises 都完畢了之後才繼續進行。

舉個例子：

```js:line-numbers
const sleep = (seconds) => new Promise((resolve) => {
    setTimeout(() => {
        // 等待一段時間後回應結果
        console.log('sleep for', seconds, 'seconds');
        resolve(null);
    }, seconds * 1000)
})

// 等待所有 promises 都結束
await Promise.all([
    sleep(3), // 等待 3 秒
    sleep(1), // 等待 1 秒
]);

console.log('done!');

// 試著跑跑看結果如何？
```

得出的結果應該會如下：

```js:line-numbers
// sleep for 1 seconds
// sleep for 3 seconds
// done!
```

### `Promise.race()`

那麼換個情境，如果今天的需求是 `先有回應的請求先處理` 呢？

```js:line-numbers
await Promise.race([
    sleep(2), // 等待 1 秒
    sleep(3), // 等待 1 秒
    sleep(1), // 等待 3 秒
]);

console.log('done!');

// 試著跑跑看結果如何？
```

```js:line-numbers
// sleep for 1 seconds
// done!
// sleep for 2 seconds
// sleep for 3 seconds
```

我們發現，只要第一個請求完成，就會馬上往下執行，不會被其他請求阻擋。

### 錯誤處理

假設已經有了一個 Promise：

```js:line-numbers
const successOrFail = (num) => new Promise((resolve, reject) => {
    // 50% 機會 true, 50% 機會 false
    if (num > 0.5) {
        // 如果 true 就 resolve
        resolve('success');
    }

    // 如果 false 就 reject
    reject('fail');
})
```

那麼，要如何去處理它的錯誤呢？

可以使用 `catch` 來處理拋出的錯誤。

```js:line-numbers
successOrFail(Math.random())
    .then((res) => {
        console.log(res); // 'success'
    })
    .catch((err) => {
        console.log(err); // 'fail'
    })
    .finally(() => {
        console.log('this will print anyway'); // 不論成功或失敗都會執行
    })
```

### 將結果帶入下一層

> 情境：API 取回的結果，要接著帶入下一個 API 使用

```js:line-numbers
callApi1()
    .then((res) => {
        // 這裡對第一個結果做一些處理...

        return callApi2(res);
    })
    .then((res) => {
        // 這裡得到第二個 API call 的結果
    })
```

因為之前寫過 `Angular`，覺得這邊的使用方式其實跟 `RxJS` 的 `pipe` 有點相似。

### `async` `await`

剛接觸 JS 的時候，對於同步異步還不是非常了解，直到現在有時還是會卡在奇怪的非同步問題上好一陣子。

後來漸漸發覺，會出現這些問題，通常都是設計模式不良造成的。一個好的模式，應該要很清楚在哪些時候呼叫了哪些方法，而不用每一個 function 逐行檢查。Function 本身交給單元測試，我們應該只需要關注邏輯層就好，目前還在這一塊上面努力。

通常打 API 的時候，會把 promise 包在 function 內，此時需要定義 function 為 `async` 異步函式，才能在呼叫這個函式的時候，使用 `await` 來等待它執行。

```js:line-numbers
async function requestData() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

        console.log(res.body);
    } catch(err) {
        console.err('receive api error: ', err);
    }
}

// 呼叫它!
await requestData();
```

經過了幾年程式開發的薰陶，似乎已經對 Promise 比較熟悉，能夠深入淺出寫出基本應用的方式。

以上，就到這邊！
