import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EnglishPage } from '../english/english';
import { BasicPage } from '../my/basic/basic';


@Component(
{
    templateUrl: 'tabs.html'
})

export class TabsPage
{
    tab1Root: any = HomePage;
    tab2Root: any = EnglishPage;
    tab3Root: any = BasicPage;

    constructor()
    {

    }
}
