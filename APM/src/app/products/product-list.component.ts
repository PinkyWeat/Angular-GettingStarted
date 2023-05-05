import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductSerice } from './product.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = ' ';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ' + value)
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductSerice) {}

    performFilter(filteredBy: string): IProduct[] {
        filteredBy = filteredBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filteredBy));
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            // key-value fun -- key "next" - value: la fun
            // next => que hacer cuando recibe la data
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string){
        this.pageTitle = 'Product List: ' + message;
    }

}