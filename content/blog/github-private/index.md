---
title: github private
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

인터뷰할때..
저장소 클론 안받아질때!
참조: https://tmjb.tistory.com/83

또하나
Next.js window객체가 없다고할때
https://velog.io/@taese0ng/Next.js-window객체가-없다고할때

무료도메인사용법
https://www.google.com/search?client=safari&rls=en&q=%EB%AC%B4%EB%A3%8C%EB%8F%84%EB%A9%94%EC%9D%B8&ie=UTF-8&oe=UTF-8#fpstate=ive&vld=cid:0096fcca,vid:-MbyMN9dpPw,st:0
https://내도메인.한국/page/domain_conf_view.php?id=2294892

public리포 받고 push안될때
아래와 같이 % vi ~/.ssh/config를 설정
Host github-brlyle
Hostname github.com
User git
IdentityFile ~/.ssh/brlyle.ww
그담에 아래같이 치면됨. git config user.name같은거 필요없음
git remote set-url origin git@github-brlyle:brlyle/brlyle.github.io.git

로컬에서 깃헙 여러유저 사용하기도 해야함


gmocoin-tools
仮想通貨移動履歴の未確認検索
decimal.js가 안됐었던 이유
npm의 패키지로서 존재하지만 패키지가 업뎃되어서 동작하지 않게 되는것을 방지하기 위해
정적파일로서 불러오기 위해서
```html
<script
type="text/javascript"
src="/static/js/decimal.js"></script>
```
이렇게 설정해두고 public에 저장해서 쓰면된다.
nextjs/gmocoin-tools/public/static/js/decimal.js

gmocoin-tools
仮想通貨移動履歴の未確認検索
Goland의 Simplify가 알려준거임. 검증은 gpt한테. 아래와 같이 물어봤을때
```
if (inIndexFrom !== undefined && inIndexFrom != null) {
이거는 아래와 같이 바꿔도 문제없니?
if (inIndexFrom != undefined) {
```
```
네, if (inIndexFrom !== undefined && inIndexFrom != null)를 if (inIndexFrom != undefined)로 바꿔도 동일하게 작동합니다.

차이점 설명
!=와 ==는 느슨한 동등 연산자로, 두 값이 타입이 다르더라도 값이 같다고 판단하면 true를 반환합니다.
!==와 ===는 엄격한 동등 연산자로, 타입이 다르면 false를 반환합니다.
if (inIndexFrom != undefined)는 undefined와 null 모두를 포함하여 검사합니다. 이 구문은 inIndexFrom이 null이나 undefined가 아닐 경우에만 참입니다.

정리
if (inIndexFrom != undefined)는 inIndexFrom이 null이거나 undefined일 때를 모두 확인하기 때문에, 원래 코드와 동일하게 동작합니다.
따라서 구문을 단순화하려는 경우 if (inIndexFrom != undefined)로 변경해도 무방합니다.
```

This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](https://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)

You can also write code blocks here!

```js
const saltyDuckEgg = "chinese preserved food product"
```

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

[View raw (TEST.md)](https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md)

This is a paragraph.

    This is a paragraph.

# Header 1

## Header 2

    Header 1
    ========

    Header 2
    --------

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1 #
    ## Header 2 ##
    ### Header 3 ###
    #### Header 4 ####
    ##### Header 5 #####
    ###### Header 6 ######

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

    > ## This is a header.
    > 1. This is the first list item.
    > 2. This is the second list item.
    >
    > Here's some example code:
    >
    >     Markdown.generate();

- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue

```markdown
- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue
```

- `code goes` here in this line
- **bold** goes here

```markdown
- `code goes` here in this line
- **bold** goes here
```

1. Buy flour and salt
1. Mix together with water
1. Bake

```markdown
1. Buy flour and salt
1. Mix together with water
1. Bake
```

1. `code goes` here in this line
1. **bold** goes here

```markdown
1. `code goes` here in this line
1. **bold** goes here
```

Paragraph:

    Code

<!-- -->

    Paragraph:

        Code

---

---

---

---

---

    * * *

    ***

    *****

    - - -

    ---------------------------------------

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

    This is [an example](http://example.com "Example") link.

    [This link](http://example.com) has no title attr.

    This is [an example] [id] reference-style link.

    [id]: http://example.com "Optional Title"

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__

This paragraph has some `code` in it.

    This paragraph has some `code` in it.

![Alt Text](https://via.placeholder.com/200x50 "Image Title")

    ![Alt Text](https://via.placeholder.com/200x50 "Image Title")
