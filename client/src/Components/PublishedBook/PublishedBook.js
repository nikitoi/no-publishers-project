import React from 'react';
import zaglushka from '../BooksList/zaglushka'
import '../InfoBook/InfoBook'


function PublishedBook(props) {
  
  const book = zaglushka[0]
  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
        <img className='imgCover' src={`../.${book.image}`} alt='book' />
        </div>
        <div className='bookInfo'>
          <h3 className='color_dark titleBook' >{book.title}</h3>
          <h5 className='color_dark authorBook' >{book.author}</h5>
          <div className='summaryBook color_dark mt-5' >
            Информация о книге iwrjfo;airwho;awirhvpiawhroaiwbrnioahwrpjawroighaoiwrhgaiperhjgiaehjrgp alnoairghiarhoiaerhg aeirgjoairegoaeirgiaergj aierjgoiaerhgoierajgskjfaowrifhoaiwhrfoiawhefiawhefoiawhfawifhwaifhowiarhfowahefiweahfiawhefiahwefoihaiwehalshd
            Информация о книге iwrjfo;airwho;awirhvpiawhroaiwbrnioahwrpjawroighaoiwrhgaiperhjgiaehjrgp alnoairghiarhoiaerhg aeirgjoairegoaeirgiaergj aierjgoiaerhgoierajgskjfaowrifhoaiwhrfoiawhefiawhefoiawhfawifhwaifhowiarhfowahefiweahfiawhefiahwefoihaiwehalshd
            Информация о книге iwrjfo;airwho;awirhvpiawhroaiwbrnioahwrpjawroighaoiwrhgaiperhjgiaehjrgp alnoairghiarhoiaerhg aeirgjoairegoaeirgiaergj aierjgoiaerhgoierajgskjfaowrifhoaiwhrfoiawhefiawhefoiawhfawifhwaifhowiarhfowahefiweahfiawhefiahwefoihaiwehalshd
            Информация о книге iwrjfo;airwho;awirhvpiawhroaiwbrnioahwrpjawroighaoiwrhgaiperhjgiaehjrgp alnoairghiarhoiaerhg aeirgjoairegoaeirgiaergj aierjgoiaerhgoierajgskjfaowrifhoaiwhrfoiawhefiawhefoiawhfawifhwaifhowiarhfowahefiweahfiawhefiahwefoihaiwehalshd
            </div>
        </div>
      </div>
      <div className='buttonList'>
        <button className='button buttonBook butlist mr-3' >Изменить</button>
        <button className='button buttonBook butlist' >Удалить</button>
      </div>
    </div>
  );
}
export default PublishedBook;
