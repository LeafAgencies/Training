let validPasswords = [];

function loadPasswordsFromFile() {
    fetch('passwords.txt')
        .then(response => response.text())
        .then(data => {
            validPasswords = data.split('\n').map(line => {
                const [name, password] = line.trim().split(':');
                return { name, password };
            });
        })
        .catch(error => console.error('Error loading passwords:', error));
}

function checkPassword(password) {
    const passwordWithoutSpaces = password.replace(/\s/g, '');
    const validUser = validPasswords.find(user => user.password === passwordWithoutSpaces);
    return validUser ? validUser.name : null;
}

loadPasswordsFromFile();

function checkPhoneNumber(event) {
    event.preventDefault();
    const phoneInput = document.getElementById('phone');
    const button = document.querySelector('button');
    const loginContainer = document.getElementById('login-div');
    const loginText = document.querySelector('.login-text');
    const videoDiv = document.getElementById('video-div');
    const quizDiv = document.querySelector('.quiz-div');

    const phoneNumber = phoneInput.value.trim();
    phoneInput.value = '';
    phoneInput.setAttribute('autocomplete', 'off');

    const userName = checkPassword(phoneNumber);
    if (userName) {
        loginContainer.classList.remove('rejected');
        loginContainer.classList.add('accepted');

        const selectedLanguage = document.querySelector('.selected').textContent;
        if (selectedLanguage === 'Afrikaans') {
            button.innerText = `Aanmelding Sukses, Welkom ${userName}`;
        } else if (selectedLanguage === 'Xhosa') {
            button.innerText = `Ngena ngempumelelo, wamkelekile ${userName}`;
        } else {
            button.innerText = `Login Success, Welcome ${userName}`;
        }

        button.style.backgroundColor = 'green';
        setTimeout(() => {
            button.innerText = 'Start';
            button.style.backgroundColor = '';
            loginContainer.classList.remove('accepted');
            document.getElementById('login-form').remove();
            button.remove();
            const video = videoDiv.querySelector('video');
            video.controls = true;
            video.style.width = '100%';
            video.style.height = 'auto';
            loginContainer.appendChild(video);
            videoDiv.remove();
            loginText.remove();

            loginContainer.innerHTML += `<p>Please watch this training video and then answer the quiz.</p>`;
            quizDiv.style.display = 'block';
        }, 1500);
    } else {
        loginContainer.classList.remove('accepted');
        loginContainer.classList.add('rejected');
        const selectedLanguage = document.querySelector('.selected').textContent;
        if (selectedLanguage === 'Afrikaans') {
            button.innerText = `Kon nie aanmeld nie`;
        } else if (selectedLanguage === 'Xhosa') {
            button.innerText = `Ukungena akuphumelelanga`;
        } else {
            button.innerText = `Login Failed`;
        }
        button.style.backgroundColor = 'red';
        setTimeout(() => {
            button.innerText = 'Start';
            button.style.backgroundColor = '';
            loginContainer.classList.remove('rejected');
        }, 2000);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const languageButtons = document.querySelectorAll('.language-button');

    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            languageButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        });
    });
})

const quizData = [
    {
        question: 'What is the main ingredient in the stress relief supplement mentioned?',
        options: ['Caffeine', 'Suntheanine', 'Melatonin', 'Valerian Root'],
        answer: 'Suntheanine',
    },
    {
        question: 'How does Prozen claim to help with stress and anxiety?',
        options: ['By inducing drowsiness', 'By promoting relaxation without side effects', 'By increasing caffeine intake', 'By reducing physical activity'],
        answer: 'By promoting relaxation without side effects',
    },
    {
        question: 'According to the information, what is a potential consequence of long-term stress?',
        options: ['Increased immune function', 'Enhanced cardiovascular health', 'Reduced risk of anxiety', 'Damage to health systems like immune, cardiovascular, and nervous systems'],
        answer: 'Damage to health systems like immune, cardiovascular, and nervous systems',
    },
    {
        question: 'What are some stress management techniques mentioned in the text?',
        options: ['Consuming sugary foods', 'Avoiding exercise', 'Following a healthy diet and exercise routine', 'Taking Prozen only'],
        answer: 'Following a healthy diet and exercise routine',
    },
    {
        question: 'How does Prozen claim to help with PMS symptoms?',
        options: ['By causing drowsiness', 'By promoting relaxation and reducing stress', 'By increasing caffeine intake', 'By reducing physical activity'],
        answer: 'By promoting relaxation and reducing stress',
    },
    {
        question: 'Prozen is a prescription-only medication.',
        options: ['True', 'False'],
        answer: 'False',
    },
    {
        question: 'Prozen can help improve sleep quality.',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Suntheanine is derived from the green tea plant.',
        options: ['True', 'False'],
        answer: 'False',
    },
    {
        question: 'Prozen can lead to dependency with prolonged use.',
        options: ['True', 'False'],
        answer: 'False',
    },
    {
        question: 'Stress can have negative effects on health systems like the immune, cardiovascular, and nervous systems.',
        options: ['True', 'False'],
        answer: 'True',
    },
];

const quizDataAfrikaans = [
    {
        question: 'Wat is die hoofbestanddeel in die stresverligtingsaanvulling wat genoem word?',
        options: ['Kafeïen', 'Suntheanine', 'Melatonien', 'Valeriaanwortel'],
        answer: 'Suntheanine',
    },
    {
        question: 'Hoe beweer Prozen om met stres en angs te help?',
        options: ['Deur dowwighed te veroorsaak', 'Deur ontspanning te bevorder sonder newe-effekte', 'Deur kafeïeninname te verhoog', 'Deur fisieke aktiwiteit te verminder'],
        answer: 'Deur ontspanning te bevorder sonder newe-effekte',
    },
    {
        question: 'Volgens die inligting, wat is n potensiële gevolg van langtermynstres?',
        options: ['Verhoogde immuunfunksie', 'Verbeterde kardiovaskulêre gesondheid', 'Verminderde risiko van angs', 'Skade aan gesondheidstelsels soos immuun-, kardiovaskulêre- en senuweestelsels'],
        answer: 'Skade aan gesondheidstelsels soos immuun-, kardiovaskulêre- en senuweestelsels',
    },
    {
        question: 'Wat is n paar stresbestuurs tegnieke wat in die teks genoem word?',
        options: ['Verbruik van suikerhoudende voedsel', 'Vermyding van oefening', 'Volg n gesonde dieet en oefenroetine', 'Neem net Prozen'],
        answer: 'Volg n gesonde dieet en oefenroetine',
    },
    {
        question: 'Hoe beweer Prozen om met PMS simptome te help?',
        options: ['Deur dowwighed te veroorsaak', 'Deur ontspanning te bevorder en stres te verminder', 'Deur kafeïeninname te verhoog', 'Deur fisieke aktiwiteit te verminder'],
        answer: 'Deur ontspanning te bevorder en stres te verminder',
    },
    {
        question: 'Prozen is n slegs-op-resep-middel.',
        options: ['Waar', 'Vals'],
        answer: 'Vals',
    },
    {
        question: 'Prozen kan help om slaapkwaliteit te verbeter.',
        options: ['Waar', 'Vals'],
        answer: 'Waar',
    },
    {
        question: 'Suntheanine is afkomstig van die groen tee plant.',
        options: ['Waar', 'Vals'],
        answer: 'Vals',
    },
    {
        question: 'Prozen kan lei tot afhanklikheid met langdurige gebruik.',
        options: ['Waar', 'Vals'],
        answer: 'Vals',
    },
    {
        question: 'Stres kan negatiewe effekte op gesondheidstelsels soos die immuun-, kardiovaskulêre- en senuweestelsels hê.',
        options: ['Waar', 'Vals'],
        answer: 'Waar',
    },
];

const quizDataXhosa = [
    {
        question: 'Yintoni ingredianti ebalulekileyo kwisuplemento sokwenza kuzikhathi kwezinto ezithe ngendlela engaqondakaliweyo?',
        options: ['Ikhafein', 'Suntheanine', 'Melatonin', 'I-Valerian Root'],
        answer: 'Suntheanine',
    },
    {
        question: 'I-Prozen ivala ukuba izinzi kanye nenkcukacha zempatho ngenxa yokungasondeli?',
        options: ['Ngoxwebileyo', 'Ngekwenza uxolo okanye ukubonelela kokuphumla ngeenkcukacha', 'Nokuvula ukunyeliswa kwekhafein', 'Nokukwenzela ingcaciso yokusweleka'],
        answer: 'Ngekwenza uxolo okanye ukubonelela kokuphumla ngeenkcukacha',
    },
    {
        question: 'Kwikhaya lesazini, yintoni into ebalulekileyo ekuboniseni ukuba ingajongi imingcele ebalulekileyo?',
        options: ['Ukwenza izilonda zoluntu kukhula', 'Ukwenza inzulu yekardiyovasikyulaya ihlazi', 'Ukwenza izinga elikhulu lwee-anxiety ', 'Kwenza ubundlobongela maziko asemzimbeni njengoko immune, cardiovascular, nezilwanyana zemzimba'],
        answer: 'Kwenza ubundlobongela maziko asemzimbeni njengoko immune, cardiovascular, nezilwanyana zemzimba',
    },
    {
        question: 'Iziphulo ezikhoyo zomxhaso wezingqinamba zihlanganisa yini?',
        options: ['Ukuqhwabula iifoodi eziswiti', 'Ukugibela ukozwe', 'Ukufunda igqwirha elinomdaka kunye neqela lokusebenza', 'Ukuthenga i-Prozen kuphela'],
        answer: 'Ukufunda igqwirha elinomdaka kunye neqela lokusebenza',
    },
    {
        question: 'I-Prozen ithi ntoni ngeenkxalabo zomtsha wePMS?',
        options: ['Ngoxwebileyo', 'Ngekwenza uxolo kunye nokuphucula uswelekele', 'Nokuvula ukunyeliswa kwekhafein', 'Nokukwenzela ingcaciso yokusweleka'],
        answer: 'Ngekwenza uxolo kunye nokuphucula uswelekele',
    },
    {
        question: 'I-Prozen yinto oyifake ngenkathalo kuphela.',
        options: ['Yiyo', 'Hayi'],
        answer: 'Hayi',
    },
    {
        question: 'I-Prozen ikwenzela ukulungisa ubungcono bezilalwazi.',
        options: ['Yiyo', 'Hayi'],
        answer: 'Yiyo',
    },
    {
        question: 'Usuntheanine uyahamiswa kwi-imithi yomdaka ebomvu.',
        options: ['Yiyo', 'Hayi'],
        answer: 'Hayi',
    },
    {
        question: 'I-Prozen inikeza ukwenza zingcaciso ngokuphela ngexabiso elide.',
        options: ['Yiyo', 'Hayi'],
        answer: 'Hayi',
    },
    {
        question: 'Ukunweba kungangenalo kwiimeko ebalulekileyo njengeengcaciso, ikardiyovasikyulera, kunye nezilwanyana zemzimba.',
        options: ['Yiyo', 'Hayi'],
        answer: 'Yiyo',
    },
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    let questionData;
    if (document.querySelector('.selected').textContent === 'Afrikaans') {
        questionData = quizDataAfrikaans[currentQuestion];
    } else if (document.querySelector('.selected').textContent === 'Xhosa') {
        questionData = quizDataXhosa[currentQuestion];
    } else {
        questionData = quizData[currentQuestion];
    }

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    for (let i = 0; i < questionData.options.length; i++) {
        const option = document.createElement('button');
        option.className = 'option';
        option.textContent = questionData.options[i];
        option.addEventListener('click', () => {
            const selectedOption = option.textContent;
            if (selectedOption === questionData.answer) {
                score++;
            }
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        });
        optionsElement.appendChild(option);
    }

    document.getElementById('quiz').innerHTML = '';
    document.getElementById('quiz').appendChild(questionElement);
    document.getElementById('quiz').appendChild(optionsElement);
}


function displayResult() {
    document.getElementById('quiz').style.display = 'none';
    if (score >= 9) {
        fetch('codes.txt')
            .then(response => response.text())
            .then(data => {
                const codes = data.trim().split('\n');
                const firstCode = codes[0];
                document.getElementById('result').innerHTML = `Congratulations! You scored ${score} out of ${quizData.length}! You are a winner!`;
                
                const button = document.createElement('button');
                button.textContent = 'Claim code';
                button.addEventListener('click', () => {
                    button.textContent = 'Code claimed';
                    codes.shift();
                    fetch('codes.txt', {
                        method: 'DELETE'
                    }).then(() => {
                        document.getElementById('result').innerHTML += `<br>Your KFC voucher code: ${firstCode}`;
                    }).catch(error => console.error('Error deleting code:', error));
                });
                document.getElementById('result').appendChild(button);
            })
            .catch(error => {
                console.error('Error loading codes:', error);
                document.getElementById('result').innerHTML = `Congratulations! You scored ${score} out of ${quizData.length}! You are a winner!`;
            });
    } else {
        document.getElementById('result').innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }
}

displayQuestion();

document.getElementById('result').addEventListener('click', function () {
    const button = document.querySelector('.result button');
    button.textContent = 'Code claimed';
    const codes = button.getAttribute('data-codes').split('\n');
    const firstCode = codes.shift();
    button.setAttribute('data-codes', codes.join('\n'));
    document.getElementById('result').innerHTML += `<br>Your KFC voucher code: ${firstCode}`;
});

document.addEventListener("DOMContentLoaded", function () {
    const languageButtons = document.querySelectorAll('.language-button');
    const welcomeText = document.querySelector('.login-text');
    const startButton = document.querySelector('button[type="submit"]');

    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            languageButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');

            if (button.textContent === 'Afrikaans') {
                welcomeText.textContent = 'Teken asseblief in met jou telefoonnommer om toegang tot opleidingsmateriaal te verkry';
                startButton.textContent = 'Begin';
            } else if (button.textContent === 'Xhosa'){
                welcomeText.textContent = 'Nceda ungene usebenzisa inombolo yefowuni yakho ukufikelela kumathiriyeli woqeqesho';
                startButton.textContent = 'Qala';
            } else {
                welcomeText.textContent = 'Please login with your phone number to access training materials';
                startButton.textContent = 'Start';
            }
        });
    });
})

