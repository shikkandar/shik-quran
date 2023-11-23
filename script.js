let currentPage=1;
let itemPerPage=40;
let surahNumber = 1;

console.log(currentPage);
async function apiData() {
    const translationKey = 'tamil_baqavi';

   
    try {
        // Example for surah translation
        const surahRes = await fetch(`https://quranenc.com/api/v1/translation/sura/${translationKey}/${surahNumber}`);
        const surahData = await surahRes.json();
        quranDta(surahData)
    } catch (err) {
        console.error(err);
    }
}

async function quranDta(surahData) {
    const sura=surahData.result;
   
  // Display surah translation in the surah div
  const suraContainer= document.getElementById('sura')
  suraContainer.innerHTML='';

  //slice data

  const startIndex=(currentPage-1)*itemPerPage;
  const endIndex=startIndex+itemPerPage;

    sura.slice(startIndex,endIndex).forEach(element => {
        const arabicText=element.arabic_text;
        const tamilText=element.translation;

        const div=document.createElement('div');
        div.innerHTML=`<h2 class="text-end m-4">${arabicText }<h2/>
                       <h6>${tamilText}<h6/>`

        suraContainer.appendChild(div)
      
    });
    pagination(sura.length)
}

function pagination(len) {
    const btsCount=Math.ceil(len/itemPerPage)
    const paginationContainer=document.getElementById('pagination');
 paginationContainer.innerHTML=''

    //all btns
    for (let i = 1; i <=btsCount; i++) {
        const allBtn=document.createElement('button');
        allBtn.setAttribute('class','btn btn-success m-2')
    
        allBtn.innerText=i;
        allBtn.addEventListener('click',()=>{
            currentPage=i;
            apiData()
        })
        paginationContainer.appendChild(allBtn)
    }
}

//Surah names
const quranSurahNames = [
    'Al-Fatiha',
    'Al-Baqara',
    'Aal-E-Imran',
    'An-Nisa',
    'Al-Ma\'ida',
    'Al-An\'am',
    'Al-A\'raf',
    'Al-Anfal',
    'At-Tawbah',
    'Yunus',
    'Hud',
    'Yusuf',
    'Ar-Ra\'d',
    'Ibrahim',
    'Al-Hijr',
    'An-Nahl',
    'Al-Isra',
    'Al-Kahf',
    'Maryam',
    'Ta-Ha',
    'Al-Anbiya',
    'Al-Hajj',
    'Al-Muminun',
    'An-Nur',
    'Al-Furqan',
    'Ash-Shu\'ara',
    'An-Naml',
    'Al-Qasas',
    'Al-Ankabut',
    'Ar-Rum',
    'Luqman',
    'As-Sajda',
    'Al-Ahzab',
    'Saba',
    'Fatir',
    'Ya-Sin',
    'As-Saffat',
    'Sad',
    'Az-Zumar',
    'Ghafir',
    'Fussilat',
    'Ash-Shura',
    'Az-Zukhruf',
    'Ad-Dukhan',
    'Al-Jathiya',
    'Al-Ahqaf',
    'Muhammad',
    'Al-Fath',
    'Al-Hujurat',
    'Qaf',
    'Adh-Dhariyat',
    'At-Tur',
    'An-Najm',
    'Al-Qamar',
    'Ar-Rahman',
    'Al-Waqia',
    'Al-Hadid',
    'Al-Mujadila',
    'Al-Hashr',
    'Al-Mumtahina',
    'As-Saff',
    'Al-Jumu\'a',
    'Al-Munafiqun',
    'At-Taghabun',
    'At-Talaq',
    'At-Tahrim',
    'Al-Mulk',
    'Al-Qalam',
    'Al-Haaqqa',
    'Al-Maarij',
    'Nuh',
    'Al-Jinn',
    'Al-Muzzammil',
    'Al-Muddathir',
    'Al-Qiyama',
    'Al-Insan',
    'Al-Mursalat',
    'An-Naba',
    'An-Nazi\'at',
    'Abasa',
    'At-Takwir',
    'Al-Infitar',
    'Al-Mutaffifin',
    'Al-Inshiqaq',
    'Al-Burooj',
    'At-Tariq',
    'Al-Ala',
    'Al-Ghashiya',
    'Al-Fajr',
    'Al-Balad',
    'Ash-Shams',
    'Al-Lail',
    'Adh-Dhuha',
    'Ash-Sharh',
    'At-Tin',
    'Al-Alaq',
    'Al-Qadr',
    'Al-Bayyina',
    'Az-Zalzalah',
    'Al-Adiyat',
    'Al-Qaria',
    'At-Takathur',
    'Al-Asr',
    'Al-Humazah',
    'Al-Fil',
    'Quraish',
    'Al-Ma\'un',
    'Al-Kawthar',
    'Al-Kafiroon',
    'An-Nasr',
    'Al-Masad',
    'Al-Ikhlas',
    'Al-Falaq',
    'An-Nas'
];

// Example usage


const head=document.getElementById('head')
head.innerHTML=`<h3>${quranSurahNames[surahNumber-1]}<h3/>`;
document.getElementById('inpuBtn').addEventListener('click', () => {
    const input = document.getElementById('input');

    const head=document.getElementById('head')
    if (input.value >= 1 && input.value <= 114) {
        surahNumber = input.value;
        currentPage=1;
        head.innerHTML=`<h3 class="head-text">${quranSurahNames[surahNumber-1]}<h3/>`;
        input.value = '';
        apiData(); // Fetch and display updated data
    }else alert("Enter a valid surah")
});

// Example usage
apiData();

sideMenu(...quranSurahNames)
function sideMenu(...quranSurahNames) {
    const sideMenuContainer=document.getElementById("sub-1")
  apiData()
    quranSurahNames.forEach((data,i)=>{
      const surahName=data;
       const li=document.createElement('li')
        li.setAttribute('class',"mt-2")
        li.innerText=surahName;
       sideMenuContainer.appendChild(li)

       li.addEventListener('click',()=>{
        currentPage=1;
        surahNumber=i+1;
        console.log(currentPage);
        head.innerHTML = `<h3 class="head-text">${quranSurahNames[surahNumber - 1]}<h3/>`;
        apiData()
       })
       
    })
   
}