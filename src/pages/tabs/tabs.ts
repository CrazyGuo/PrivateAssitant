import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EnglishPage } from '../english/english';
import { BasicPage } from '../my/basic/basic';
import { CategoryPage } from '../category/category';


@Component(
{
    templateUrl: 'tabs.html'
})

export class TabsPage
{
    tab1Root: any = HomePage;
    tab2Root: any = EnglishPage;
    tab3Root: any = BasicPage;
    tab4Root: any = CategoryPage;

    constructor()
    {

    }
}
