import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductSerice } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

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
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
        this.listFilter = 'cart'
    }

    onRatingClicked(message: string){
        this.pageTitle = 'Product List: ' + message;
    }

}