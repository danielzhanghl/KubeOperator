import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseModelComponent} from '../../../shared/class/BaseModelComponent';
import {Host} from '../host';
import {HostService} from '../host.service';
import {ModalAlertService} from '../../../shared/common-component/modal-alert/modal-alert.service';
import {AlertLevels} from '../../../shared/common-component/common-alert/alert';

@Component({
    selector: 'app-host-detail',
    templateUrl: './host-detail.component.html',
    styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent extends BaseModelComponent<Host> implements OnInit {

    opened = false;
    item: Host = new Host();
    loading = false;
    @Output() detail = new EventEmitter();

    constructor(private hostService: HostService, private modalAlertService: ModalAlertService) {
        super(hostService);
    }

    ngOnInit(): void {
    }

    onCancel() {
        this.item = new Host();
        this.opened = false;
        this.loading = false;
    }

    open(item) {
        this.opened = true;
        this.item = item;
    }

    onSync() {
        this.loading = true;
        this.hostService.sync(this.item.name, this.item).subscribe(data => {
            this.item = data;
            this.loading = false;
        }, res => {
            this.modalAlertService.showAlert(res.error.msg, AlertLevels.ERROR);
            this.loading = false;
        });
    }

}
