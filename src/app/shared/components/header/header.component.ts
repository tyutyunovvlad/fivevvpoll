import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private id;
  public langu = 'ua';

  constructor(private router: Router, private mainService: MainService, private translate: TranslateService) {
    translate.setDefaultLang('ua');
    this.langu = localStorage.getItem('poll-lang');
    
    if (this.langu) {
      this.translate.use(this.langu);
    } else {
      this.langu = 'ua';
      translate.use('ua');
    }
    translate.setTranslation('ua', {
      home: {
        title: 'Онлайн-опитування',
        new: 'Почати нове опитування',
        find: 'Приєднатись до опитування',
        newTitle: 'Нове опитування',
        newName: 'Назва',
        code: 'Код доступу',
        altsNum: 'Кількість альтернатив',
        typeName: 'Тип шкали оцінювання',
        next: 'Далі',
        altsName: 'Введіть назви альтернатив',
        alt: 'Альтернатива',
        findTitle: 'Приєднатись до опитування',
        connect: 'Приєднатись'
      },
      alts: [
        ['Дуже погано', 'Погано', 'Байдуже (Не знаю)', 'Добре', 'Дуже добре'],
        ['Категорично проти', 'Проти', 'Байдуже (Утримався)', 'За', 'Категорично \n за'],
        ['1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Назва опитування',
        code: 'Код доступу',
        count: 'Кількість опитаних',
        firstTime: 'Перша відповідь',
        lastTime: 'Остання відповідь',
        link: 'Посилання на опитування',
        title: 'Результати опитування',
        next1: 'Детальніше',
        next2: 'Мапа переважань',
        new: 'Новий експерт',
        newTitle: 'Новий експерт',
        newName: 'Ім\'я',
        next3: 'Далі',
        exp: 'Експерт',
        no: 'Ще немає відповідей',
        submit: 'Підтвердити',
        message: {
          forget: 'Не забудьте зберегти код доступу: ',
          leave: 'Покинути опитування?'
        }
      },
      messages: {
        alts: 'Назви альтернатив повторюються',
        connectError: 'Опитування не знайдено',
        copied: 'Посилання скопійовано',
        createError: 'Опитування з таким ID вже існує',
        routerError: 'Будь ласка, увійдіть до опитування.'
      }
    });
    translate.setTranslation('ru', {
      home: {
        title: 'Онлайн-опросы',
        new: 'Начать новый опрос',
        find: 'Присоединиться к опросу',
        newTitle: 'Новый опрос',
        newName: 'Название',
        code: 'Код доступа',
        altsNum: 'Количество альтернатив',
        typeName: 'Тип шкалы оценивания',
        next: 'Далее',
        altsName: 'Введите названия альтернатив',
        alt: 'Альтернатива',
        findTitle: 'Присоединиться к опросу',
        connect: 'Присоединиться',
      },
      alts: [
        [ 'Очень плохо', 'Плохо', 'Все равно (Не знаю)', ' Хорошо', 'Очень хорошо'],
        [ 'Категорически против', 'Против', 'Все равно (Воздержался)', 'За', 'Категорически за'],
        [ '1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Название опроса',
        code: 'Код доступа',
        count: 'Количество опрошенных',
        firstTime: 'Первый ответ',
        lastTime: 'Последний ответ',
        link: 'Ссылка на опрос',
        title: 'Результаты опроса',
        next1: 'Подробнее',
        next2: 'Карта Предпочтений',
        new: 'Новый эксперт',
        newTitle: 'Новый эксперт',
        newName: 'Имя',
        next3: 'Далее',
        exp: 'Эксперт',
        no: 'Еще нет ответов',
        submit: 'Подтвердить',
        message: {
          forget: 'Не забудьте сохранить код доступа: ',
          leave: 'Выйти из опроса?'
        }
      },
      messages: {
        alts: 'Названия альтернатив повторяются',
        connectError: 'Опрос не найден',
        copied: 'Ссылка скопирована',
        createError: 'Опрос с таким ID уже существует',
        routerError: 'Пожалуйста, войдите опросу.'
      }
    });
    translate.setTranslation('en', {
      home: {
        title: 'Online Polls',
        new: 'Start a new poll',
        find: 'Join existing poll',
        newTitle: 'New Poll',
        newName: 'Name',
        code: 'Access code',
        altsNum: 'Number of alternatives',
        typeName: 'Rating scale type',
        next: 'Next',
        altsName: 'Enter alternative names',
        alt: 'Alternative',
        findTitle: 'Join poll',
        connect: 'Join'
      },
      alts: [
        ['Very bad', 'Bad', 'Indifferent (Don\'t know)', 'Good', 'Very good'],
        ['Strongly against', 'Against', 'Indifferent (Abstain)', 'For', 'Strongly for'],
        ['1', '2', '3', '4', '5']
      ],
      poll: {
        name: 'Poll name',
        code: 'Access code',
        count: 'Number of respondents',
        firstTime: 'First answer',
        lastTime: 'Last answer',
        link: 'Poll link',
        title: 'Poll results',
        next1: 'Details',
        next2: 'Preferences Map',
        new: 'New Expert',
        newTitle: 'New Expert',
        newName: 'Name',
        next3: 'Next',
        exp: 'Expert',
        no: 'There are no answers yet',
        submit: 'Confirm',
        message: {
          forget: 'Don\'t forget to save the access code: ',
          leave: 'Leave poll?'
        }
      },
      messages: {
        alts: 'Alternative names are repeated',
        connectError: 'Poll not found',
        copied: 'Link copied',
        createError: 'Poll with this ID already exists',
        routerError: 'Please log in to the poll.'
      }
    });
  }

  ngOnInit(): void {
    this.mainService.options$.subscribe((res: any) => {
      this.id = res.id;
    });
  }

  public home(): void {
    if (this.id) {
      if (confirm(this.translate.instant('poll.message.forget') + this.id + '\n' + this.translate.instant('poll.message.leave'))) {
        this.router.navigate(['home']);
      } else {
        return;
      }
    }
  }

  public lang(e): void {
    this.translate.use(e.value);
    localStorage.setItem('poll-lang', e.value);
    this.mainService.translateAlternatives();
  }
}
