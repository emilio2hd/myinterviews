require 'rails_helper'

RSpec.describe CoverLetter, type: :model do
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:content) }
  it { is_expected.to validate_length_of(:title).is_at_most(255) }

  context 'with valid data' do
    let(:attributes) { attributes_for(:cover_letter) }

    subject { CoverLetter.new(attributes) }

    it 'should save successfully' do
      expect(subject.save).to be_truthy
    end
  end

  context 'with stale object' do
    let!(:cover_letter) { create(:cover_letter) }
    let(:new_title) { FFaker::Company.position }

    before do
      @ob1 = CoverLetter.find(cover_letter.id)
      @ob2 = CoverLetter.find(cover_letter.id)
      @ob1.update(title: new_title)
    end

    it 'should throw exception' do
      expect { @ob2.update(title: new_title) }.to raise_error(ActiveRecord::StaleObjectError)
    end
  end
end
