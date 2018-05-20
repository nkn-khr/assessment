(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    /**
     * 指定した要素の子供を全て削除する
     * @param {HTMLElement} element HTMLの要素
     */

    function removeAllChildren(element){
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
        removeAllChildren(resultDivided);
        const anchor = document.createElement('a');
        anchor.innerText = 'Tweet #LoveTwitter';
        const hrefValue = 'http://twitter.com/intent/tweet?button';
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'tweetbutton';
        anchor.setAttribute('data-text','hoge');
        anchor.setAttribute('data-lang','ja');
        tweetDivided.appendChild(anchor);

        const header = document.createElement('h3');
        header.innerText = "診断結果";
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
    }
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声は云々',
        '{userName}のいいところは耳です。{userName}の特徴的なみみは云々',
        '{userName}のいいところは鼻です。{userName}の特徴的なハナは云々',
        '{userName}のいいところはやさしさです。'
    ];
    function assessment(userName) {
        /**
         * 名前の文字列を渡すと診断結果を返してくれる
         * @param {string} userName ユーザの名前
         * @return {string} 診断結果
         */
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g,userName);
        return result;

    }
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '診断が正しくありません'
    );


})();
